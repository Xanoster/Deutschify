// Background service worker for German Word Sprinkle

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(async () => {
    const defaults = {
        enabled: true,
        level: 'B1',
        frequency: 5,
        wordsToday: 0,
        pagesCount: 0,
        lastDate: new Date().toDateString()
    };

    // Only set defaults if not already set
    const existing = await chrome.storage.sync.get(Object.keys(defaults));
    const toSet = {};

    for (const [key, value] of Object.entries(defaults)) {
        if (existing[key] === undefined) {
            toSet[key] = value;
        }
    }

    if (Object.keys(toSet).length > 0) {
        await chrome.storage.sync.set(toSet);
    }

    console.log('German Word Sprinkle installed!');
});

// Update badge based on enabled state
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.enabled !== undefined) {
        updateBadge(changes.enabled.newValue);
    }
});

async function updateBadge(enabled) {
    if (enabled) {
        await chrome.action.setBadgeText({ text: '' });
    } else {
        await chrome.action.setBadgeText({ text: 'OFF' });
        await chrome.action.setBadgeBackgroundColor({ color: '#666' });
    }
}

// Initialize badge state
chrome.storage.sync.get({ enabled: true }).then(({ enabled }) => {
    updateBadge(enabled);
});
