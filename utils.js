// Utility functions for German Word Sprinkle

/**
 * Get vocabulary for a specific level (includes all lower levels too)
 */
function getVocabularyForLevel(level) {
    const allVocab = [];

    // Always include lower levels for cumulative learning
    if (window.VOCAB_A1) allVocab.push(...window.VOCAB_A1);
    if (level !== 'A1' && window.VOCAB_A2) allVocab.push(...window.VOCAB_A2);
    if ((level === 'B1' || level === 'B2') && window.VOCAB_B1) allVocab.push(...window.VOCAB_B1);
    if (level === 'B2' && window.VOCAB_B2) allVocab.push(...window.VOCAB_B2);

    return allVocab;
}

/**
 * Build a lookup map from English words to their German entries
 */
function buildWordMap(vocabulary) {
    const map = new Map();

    for (const entry of vocabulary) {
        const key = entry.english.toLowerCase();
        if (!map.has(key)) {
            map.set(key, entry);
        }
    }

    return map;
}

/**
 * Check if a character is at word boundary
 */
function isWordBoundary(char) {
    if (!char) return true;
    return /[\s.,!?;:'"()\[\]{}<>\/\\@#$%^&*+=|~`\-—–]/.test(char);
}

/**
 * Apply German capitalization rules
 * - Nouns are always capitalized
 * - Preserve sentence-start capitalization
 */
function applyGermanCapitalization(germanWord, entry, originalWord) {
    // Check if original was at sentence start (first letter uppercase, rest lowercase typical of sentence start)
    const isAtSentenceStart = originalWord[0] === originalWord[0].toUpperCase();

    // German nouns are always capitalized
    if (entry.partOfSpeech === 'noun') {
        return germanWord.charAt(0).toUpperCase() + germanWord.slice(1);
    }

    // If original was capitalized (sentence start), capitalize the German word
    if (isAtSentenceStart && originalWord[0] === originalWord[0].toUpperCase()) {
        return germanWord.charAt(0).toUpperCase() + germanWord.slice(1);
    }

    // Otherwise, keep the default German capitalization from vocabulary
    return germanWord;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Create a tooltip element for showing original word
 */
function createTooltip() {
    let tooltip = document.getElementById('german-sprinkle-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'german-sprinkle-tooltip';
        tooltip.className = 'german-sprinkle-tooltip';
        document.body.appendChild(tooltip);
    }
    return tooltip;
}

/**
 * Show tooltip near an element
 */
function showTooltip(element, originalWord, article = null) {
    const tooltip = createTooltip();

    // Build tooltip content
    let content = originalWord;
    if (article) {
        content = `${article} • ${originalWord}`;
    }

    tooltip.textContent = content;
    tooltip.classList.add('visible');

    // Position tooltip above the element
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    let top = rect.top - tooltipRect.height - 8;

    // Keep within viewport
    if (left < 8) left = 8;
    if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
    }
    if (top < 8) {
        top = rect.bottom + 8;
    }

    tooltip.style.left = `${left + window.scrollX}px`;
    tooltip.style.top = `${top + window.scrollY}px`;
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.getElementById('german-sprinkle-tooltip');
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

// Export for content script
if (typeof window !== 'undefined') {
    window.GermanSprinkleUtils = {
        getVocabularyForLevel,
        buildWordMap,
        isWordBoundary,
        applyGermanCapitalization,
        shuffleArray,
        showTooltip,
        hideTooltip
    };
}
