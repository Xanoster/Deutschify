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

    /**
     * Initialize the extension
     */
    async function init() {
        // Load settings
        try {
            const result = await chrome.storage.sync.get({
                enabled: true,
                level: 'B1',
                frequency: 15
            });
            settings = result;
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
    function processPage() {
        if (hasProcessed || !settings.enabled || !wordMap) return;
        hasProcessed = true;

        // Find all text nodes
        const textNodes = [];
        walkDOM(document.body, textNodes);

        // Find replaceable words in all text nodes
        const candidates = [];
        for (const node of textNodes) {
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

        for (const candidate of toReplace) {
            replaceWord(candidate);
        }

        // Update stats
        updateStats(toReplace.length);
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
    function findReplaceableWords(node) {
        const { isWordBoundary } = window.GermanSprinkleUtils;
        const text = node.textContent;
        const candidates = [];

        // Word boundary regex to find words
        const wordRegex = /[a-zA-Z]+/g;
        let match;

        while ((match = wordRegex.exec(text)) !== null) {
            const word = match[0];
            const lowerWord = word.toLowerCase();

            // Check if word exists in our vocabulary
            if (wordMap.has(lowerWord)) {
                const start = match.index;
                const end = start + word.length;

                // Verify word boundaries
                const charBefore = text[start - 1];
                const charAfter = text[end];

                if (isWordBoundary(charBefore) && isWordBoundary(charAfter)) {
                    candidates.push({
                        node,
                        word,
                        start,
                        end,
                        entry: wordMap.get(lowerWord)
                    });
                }
            }
        }

        return candidates;
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
            showTooltip(span, word, entry.article);
        });
        span.addEventListener('mouseleave', hideTooltip);

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
     * Update extension stats
     */
    async function updateStats(replacedCount) {
        try {
            const result = await chrome.storage.sync.get({
                wordsToday: 0,
                pagesCount: 0,
                lastDate: new Date().toDateString()
            });

            const today = new Date().toDateString();
            let { wordsToday, pagesCount, lastDate } = result;

            // Reset if new day
            if (lastDate !== today) {
                wordsToday = 0;
                pagesCount = 0;
            }

            await chrome.storage.sync.set({
                wordsToday: wordsToday + replacedCount,
                pagesCount: pagesCount + 1,
                lastDate: today
            });
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
