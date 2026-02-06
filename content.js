// Content script for German Word Sprinkle
// Replaces English words with German equivalents while browsing

(function () {
    'use strict';

    // Elements to skip when traversing DOM
    const SKIP_TAGS = new Set([
        'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'EMBED',
        'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'CODE', 'PRE',
        'SVG', 'CANVAS', 'VIDEO', 'AUDIO', 'HEAD', 'TITLE'
    ]);

    // Class added to replaced words
    const REPLACED_CLASS = 'german-sprinkle-word';

    // Track state
    let settings = {
        enabled: true,
        level: 'B1',
        frequency: 15
    };
    let wordMap = null;
    let hasProcessed = false;
    let seenWords = new Set();
    let favorites = new Set();



    /**
     * Initialize the extension
     */
    async function init() {
        // Load settings
        try {
            const result = await chrome.storage.sync.get({
                enabled: true,
                level: 'B1',
                frequency: 15,
                seenWordsList: [], // Load persisted seen words
                favorites: []
            });
            settings = result;
            if (result.seenWordsList) {
                seenWords = new Set(result.seenWordsList);
            }
            if (result.favorites) {
                favorites = new Set(result.favorites);
            }

        } catch (e) {
            console.log('German Sprinkle: Could not load settings, using defaults');
        }

        if (!settings.enabled) {
            return;
        }

        // Build vocabulary map
        const { getVocabularyForLevel, buildWordMap } = window.GermanSprinkleUtils;
        const vocabulary = getVocabularyForLevel(settings.level);
        wordMap = buildWordMap(vocabulary);

        // Process the page
        processPage();

        // Listen for settings changes
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === 'SETTINGS_UPDATED') {
                handleSettingsUpdate(message.settings);
            }
        });
    }

    /**
     * Handle settings update from popup
     */
    function handleSettingsUpdate(newSettings) {
        const wasEnabled = settings.enabled;
        Object.assign(settings, newSettings);

        if (!settings.enabled && wasEnabled) {
            // Disable: revert all replacements
            revertReplacements();
        } else if (settings.enabled && !wasEnabled) {
            // Enable: reprocess page
            const { getVocabularyForLevel, buildWordMap } = window.GermanSprinkleUtils;
            const vocabulary = getVocabularyForLevel(settings.level);
            wordMap = buildWordMap(vocabulary);
            hasProcessed = false;
            processPage();
        } else if (settings.enabled && newSettings.level) {
            // Level changed: rebuild vocab and reprocess
            const { getVocabularyForLevel, buildWordMap } = window.GermanSprinkleUtils;
            const vocabulary = getVocabularyForLevel(settings.level);
            wordMap = buildWordMap(vocabulary);
            revertReplacements();
            hasProcessed = false;
            processPage();
        }
    }

    /**
     * Revert all replaced words back to original
     */
    function revertReplacements() {
        const replacedWords = document.querySelectorAll(`.${REPLACED_CLASS}`);
        replacedWords.forEach(el => {
            const original = el.getAttribute('data-original');
            if (original) {
                el.replaceWith(document.createTextNode(original));
            }
        });
    }

    /**
     * Process the page and replace words
     */
    /**
     * Process the page and replace words
     */
    function processPage() {
        if (hasProcessed || !settings.enabled || !wordMap) return;
        hasProcessed = true;

        // Use compromise to parse the entire body text for context
        // This is much better than scanning individual text nodes which lose context
        // However, to keep DOM replacement simple, we still map back to text nodes?
        // Actually, compromise runs on string.
        // Let's stick to node walking but use compromise on the sentence level if possible.
        // FOR NOW: Let's run compromise on the text content of each block element.

        // Find all text nodes
        const textNodes = [];
        walkDOM(document.body, textNodes);

        // Find replaceable words in all text nodes
        const candidates = [];
        for (const node of textNodes) {
            // Only process if node has meaningful text
            if (node.textContent.trim().length < 3) continue;

            const words = findReplaceableWords(node);
            candidates.push(...words);
        }

        if (candidates.length === 0) return;

        // Shuffle and pick random words based on frequency setting
        const { shuffleArray } = window.GermanSprinkleUtils;
        const shuffled = shuffleArray(candidates);
        const toReplaceCount = Math.max(1, Math.floor(candidates.length * (settings.frequency / 100)));
        const toReplace = shuffled.slice(0, toReplaceCount);

        // Perform replacements (in reverse order to maintain positions)
        toReplace.sort((a, b) => {
            if (a.node !== b.node) return 0;
            return b.start - a.start;
        });

        const actuallyReplacedWords = [];
        for (const candidate of toReplace) {
            replaceWord(candidate);
            actuallyReplacedWords.push(candidate.word.toLowerCase());
        }

        // Deduplicate: only count each unique word once per page
        const uniqueWords = [...new Set(actuallyReplacedWords)];

        // Update stats with unique words
        updateStats(uniqueWords);
    }

    /**
     * Walk the DOM tree and collect text nodes
     */
    function walkDOM(node, textNodes) {
        if (!node) return;

        // Skip certain elements
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (SKIP_TAGS.has(node.tagName)) return;
            if (node.isContentEditable) return;
            if (node.classList && node.classList.contains(REPLACED_CLASS)) return;
        }

        // Collect text nodes
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text.length > 0) {
                textNodes.push(node);
            }
            return;
        }

        // Recurse into children
        for (const child of node.childNodes) {
            walkDOM(child, textNodes);
        }
    }

    /**
     * Find words in a text node that can be replaced
     */
    /**
     * Find words in a text node that can be replaced
     * Uses Compromise.js for Part-of-Speech tagging
     */
    function findReplaceableWords(node) {
        const text = node.textContent;
        const candidates = [];

        // Run NLP on the text content
        // This is a lightweight call
        let doc;
        try {
            if (typeof window.nlp === 'function') {
                doc = window.nlp(text);
            } else {
                // Fallback if nlp didn't load
                return [];
            }
        } catch (e) {
            return [];
        }

        // Internal lists from compromise
        const terms = doc.termList();

        for (const term of terms) {
            const word = term.text;
            const lowerWord = word.toLowerCase();
            const cleanWord = term.clean || lowerWord; // Removed punctuation

            if (wordMap.has(lowerWord) || wordMap.has(cleanWord)) {
                const entry = wordMap.get(lowerWord) || wordMap.get(cleanWord);

                // --- CONTEXT CHECK ---
                // If the dictionary entry has a part of speech, verify it matches
                let matchesContext = true;

                if (entry.partOfSpeech) {
                    if (entry.partOfSpeech === 'noun' && !term.tags['Noun']) matchesContext = false;
                    if (entry.partOfSpeech === 'verb' && !term.tags['Verb']) matchesContext = false;
                    if (entry.partOfSpeech === 'adjective' && !term.tags['Adjective']) matchesContext = false;
                    if (entry.partOfSpeech === 'adverb' && !term.tags['Adverb']) matchesContext = false;

                    // Special check: Don't replace proper nouns unless we are sure
                    // (prevents translating names like "Brown" or "Baker")
                    if (term.tags['ProperNoun'] && entry.partOfSpeech !== 'properNoun') {
                        matchesContext = false;
                    }
                }

                if (matchesContext) {
                    // Need to find exact position in the raw text
                    // Compromise doesn't give exact offsets relative to the original node text easily in all versions,
                    // but we can search for it near the expected area or use a simple regex fallback for location
                    // For simplicity/reliability in this hybrid approach:
                    // We know the word exists. We'll find it adjacent to others.

                    // Fallback to simple regex for location but confirmed by NLP
                    const index = text.indexOf(word); // Crude, assumes first instance. 
                    // Better: use term.offset if available or calculate.

                    // REFACTOR: The 'term' object from termList() usually has index info 
                    // relative to the start of the doc. 
                    // In version 14+, logic might vary. 
                    // Let's stick to a robust find for now:

                    const safeRegex = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g');
                    let match;
                    while ((match = safeRegex.exec(text)) !== null) {
                        candidates.push({
                            node,
                            word: match[0],
                            start: match.index,
                            end: match.index + match[0].length,
                            entry
                        });
                    }
                }
            }
        }

        return candidates;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Replace a word with its German equivalent
     */
    function replaceWord(candidate) {
        const { node, word, start, end, entry } = candidate;
        const { applyGermanCapitalization, showTooltip, hideTooltip } = window.GermanSprinkleUtils;

        const text = node.textContent;
        const before = text.slice(0, start);
        const after = text.slice(end);

        // Get the German word with proper capitalization
        const germanWord = applyGermanCapitalization(entry.german, entry, word);

        // Create the replacement span
        const span = document.createElement('span');
        span.className = REPLACED_CLASS;
        span.setAttribute('data-original', word);
        span.setAttribute('data-german', germanWord);
        if (entry.article) {
            span.setAttribute('data-article', entry.article);
        }
        span.textContent = germanWord;

        // Add hover handlers
        span.addEventListener('mouseenter', () => {
            // check if favorite (using german word as key for simplicity)
            const isFav = favorites.has(germanWord);
            showTooltip(span, germanWord, word, entry, isFav, handleFavoriteToggle);
        });
        span.addEventListener('mouseleave', (e) => {
            // Only hide if we aren't moving into the tooltip
            // The utils.hideTooltip has a delay check built-in now
            hideTooltip();
        });


        // Replace the text node with: before text + span + after text
        const parent = node.parentNode;
        if (!parent) return;

        const fragment = document.createDocumentFragment();
        if (before) fragment.appendChild(document.createTextNode(before));
        fragment.appendChild(span);
        if (after) fragment.appendChild(document.createTextNode(after));

        parent.replaceChild(fragment, node);
    }

    /**
     * Handle toggling a word as favorite
     */
    async function handleFavoriteToggle(germanWord, entry, isFavorite) {
        if (isFavorite) {
            favorites.add(germanWord);
        } else {
            favorites.delete(germanWord);
        }

        // Persist
        try {
            await chrome.storage.sync.set({
                favorites: Array.from(favorites)
            });
        } catch (e) {
            console.error("Failed to save favorite", e);
        }
    }

    /**
     * Update extension stats
     */
    /**
     * Update extension stats - Only count NEW words
     */
    async function updateStats(replacedWordsList) {
        try {
            const result = await chrome.storage.sync.get({
                wordsToday: 0,
                pagesCount: 0,
                lastDate: new Date().toDateString(),
                seenWordsList: []
            });

            const today = new Date().toDateString();
            let { wordsToday, pagesCount, lastDate } = result;
            let currentSeenList = new Set(result.seenWordsList || []);

            // Reset if new day
            if (lastDate !== today) {
                wordsToday = 0;
                pagesCount = 0;
                // Optional: Reset seen words daily? User said "count new words", maybe per day or lifetime.
                // Usually "new words" implies lifetime or resetting daily. 
                // Let's assume daily "new words encountered" for the stats counter.
                currentSeenList = new Set();
            }

            let newWordsCount = 0;
            for (const w of replacedWordsList) {
                if (!currentSeenList.has(w)) {
                    currentSeenList.add(w);
                    newWordsCount++;
                }
            }

            // Only update if we found new words or visited a new page
            if (newWordsCount > 0 || lastDate !== today) {
                await chrome.storage.sync.set({
                    wordsToday: wordsToday + newWordsCount,
                    pagesCount: pagesCount + 1,
                    lastDate: today,
                    seenWordsList: Array.from(currentSeenList)
                });
            } else {
                // Just update page count
                await chrome.storage.sync.set({
                    pagesCount: pagesCount + 1,
                    lastDate: today
                });
            }
        } catch (e) {
            // Stats update failed, non-critical
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
