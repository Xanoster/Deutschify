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
function showTooltip(element, germanWord, originalWord, entry, isFavorite = false, onToggleFavorite = null) {
    const tooltip = createTooltip();

    // Clear previous content
    tooltip.innerHTML = '';

    // Prevent hiding when hovering the tooltip itself
    tooltip.onmouseenter = () => {
        if (tooltip.hideTimeout) clearTimeout(tooltip.hideTimeout);
    };
    tooltip.onmouseleave = () => {
        hideTooltip();
    };

    // 1. Header
    const header = document.createElement('div');
    header.className = 'gs-tooltip-header';

    // Word & Type
    const titleGroup = document.createElement('div');

    const germanEl = document.createElement('div');
    germanEl.className = 'gs-german-word';
    germanEl.textContent = germanWord;
    titleGroup.appendChild(germanEl);

    if (entry.partOfSpeech) {
        const typeEl = document.createElement('span');
        typeEl.className = 'gs-word-type';
        typeEl.textContent = entry.partOfSpeech;
        germanEl.appendChild(typeEl);
    }

    header.appendChild(titleGroup);

    // Favorite Button
    const favBtn = document.createElement('button');
    favBtn.className = 'gs-fav-btn';
    if (isFavorite) favBtn.classList.add('active');
    favBtn.innerHTML = isFavorite ? ICONS.star : ICONS.starOutline;
    favBtn.title = isFavorite ? "Remove from favorites" : "Add to favorites";

    favBtn.onclick = (e) => {
        e.stopPropagation();
        const newState = !favBtn.classList.contains('active');
        favBtn.classList.toggle('active', newState);
        favBtn.innerHTML = newState ? ICONS.star : ICONS.starOutline;
        favBtn.title = newState ? "Remove from favorites" : "Add to favorites";

        if (onToggleFavorite) {
            onToggleFavorite(germanWord, entry, newState);
        }
    };

    header.appendChild(favBtn);
    tooltip.appendChild(header);

    // 2. Body
    const body = document.createElement('div');
    body.className = 'gs-tooltip-body';

    // Translation
    const translationDiv = document.createElement('div');
    translationDiv.className = 'gs-translation';
    translationDiv.innerHTML = `<span class="gs-label">EN</span> ${originalWord}`;
    // ^ simplified. Ideally show entry.english
    body.appendChild(translationDiv);

    // Meta (Gender, etc)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'gs-meta';

    if (entry.article) {
        const articleTag = document.createElement('span');
        articleTag.className = 'gs-meta-tag';
        articleTag.textContent = entry.article; // "der", "die", "das"

        // Add gender hint if apparent
        if (entry.article === 'der') articleTag.title = 'Masculine';
        if (entry.article === 'die') articleTag.title = 'Feminine';
        if (entry.article === 'das') articleTag.title = 'Neutral';

        metaDiv.appendChild(articleTag);
    }

    if (entry.gender) {
        const genderTag = document.createElement('span');
        genderTag.className = 'gs-meta-tag';
        genderTag.textContent = entry.gender;
        metaDiv.appendChild(genderTag);
    }

    body.appendChild(metaDiv);

    // Example
    if (entry.example || entry.examples) {
        const exText = entry.example || (Array.isArray(entry.examples) ? entry.examples[0] : null);
        if (exText) {
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'gs-example';
            exampleDiv.innerHTML = `
                <div class="gs-example-de">"${exText}"</div>
                <div class="gs-example-en">${entry.exampleEn || 'Example: ' + exText}</div>
            `;
            body.appendChild(exampleDiv);
        } else {
            // Fallback example generator
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'gs-example';
            const germanEx = `Das ist ${entry.article ? entry.article + ' ' : ''}${germanWord}.`;
            const englishEx = `That is ${entry.article ? entry.article + ' ' : ''}${originalWord}.`;
            exampleDiv.innerHTML = `
                <div class="gs-example-de">"${germanEx}"</div>
                <div class="gs-example-en">${englishEx}</div>
            `;
            body.appendChild(exampleDiv);
        }
    } else {
        // Auto-generate simple example
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'gs-example';
        const germanEx = `Hier ist ${entry.article ? entry.article + ' ' : ''}${germanWord}.`;
        const englishEx = `Here is ${entry.article ? 'the ' : ''}${originalWord}.`;
        exampleDiv.innerHTML = `
            <div class="gs-example-de">"${germanEx}"</div>
            <div class="gs-example-en">${englishEx}</div>
        `;
        body.appendChild(exampleDiv);
    }

    tooltip.appendChild(body);
    tooltip.classList.add('visible');

    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + (rect.width - tooltipRect.width) / 2;
    let top = rect.top - tooltipRect.height - 12; // 12px gap

    // Keep within viewport
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }

    // Flip to bottom if top clipped
    if (top < 10) {
        top = rect.bottom + 12;
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
        // Add delay to allow moving mouse to tooltip
        tooltip.hideTimeout = setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 150); // 150ms delay
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

/**
 * Icons
 */
const ICONS = {
    star: '<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    starOutline: '<svg viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.01 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>'
};
