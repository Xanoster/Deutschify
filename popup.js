// Level descriptions
const levelDescriptions = {
  A1: 'Beginner - Basic phrases & greetings',
  A2: 'Elementary - Everyday expressions',
  B1: 'Intermediate - Everyday topics',
  B2: 'Upper Intermediate - Complex texts'
};

// DOM elements
const enabledToggle = document.getElementById('enabled-toggle');
const levelButtons = document.querySelectorAll('.level-btn');
const levelDescription = document.getElementById('level-description');
const frequencySlider = document.getElementById('frequency-slider');
const frequencyValue = document.getElementById('frequency-value');
const wordsLearned = document.getElementById('words-learned');
const pagesVisited = document.getElementById('pages-visited');

// Load saved settings
async function loadSettings() {
  const result = await chrome.storage.sync.get({
    enabled: true,
    level: 'B1',
    frequency: 15,
    wordsToday: 0,
    pagesCount: 0,
    lastDate: new Date().toDateString()
  });

  // Reset daily stats if new day
  const today = new Date().toDateString();
  if (result.lastDate !== today) {
    result.wordsToday = 0;
    result.pagesCount = 0;
    await chrome.storage.sync.set({ 
      wordsToday: 0, 
      pagesCount: 0, 
      lastDate: today 
    });
  }

  // Apply settings to UI
  enabledToggle.checked = result.enabled;
  frequencySlider.value = result.frequency;
  frequencyValue.textContent = result.frequency + '%';
  wordsLearned.textContent = result.wordsToday;
  pagesVisited.textContent = result.pagesCount;

  // Set active level button
  levelButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === result.level);
  });
  levelDescription.textContent = levelDescriptions[result.level];
}

// Save settings
async function saveSettings(settings) {
  await chrome.storage.sync.set(settings);
  
  // Notify content scripts of settings change
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs[0]) {
    try {
      await chrome.tabs.sendMessage(tabs[0].id, { 
        type: 'SETTINGS_UPDATED', 
        settings 
      });
    } catch (e) {
      // Content script might not be loaded yet
    }
  }
}

// Event listeners
enabledToggle.addEventListener('change', () => {
  saveSettings({ enabled: enabledToggle.checked });
});

levelButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    levelButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const level = btn.dataset.level;
    levelDescription.textContent = levelDescriptions[level];
    saveSettings({ level });
  });
});

frequencySlider.addEventListener('input', () => {
  frequencyValue.textContent = frequencySlider.value + '%';
  saveSettings({ frequency: parseInt(frequencySlider.value) });
});

// Initialize
loadSettings();

// Listen for stats updates
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.wordsToday) {
      wordsLearned.textContent = changes.wordsToday.newValue;
    }
    if (changes.pagesCount) {
      pagesVisited.textContent = changes.pagesCount.newValue;
    }
  }
});
