# Deutschify (German Word Sprinkle) 🇩🇪 ✨

Deutschify is a Chrome extension designed for **passive German vocabulary acquisition**. It automatically replaces English words with their German equivalents on websites you visit, allowing you to learn new vocabulary in context without dedicated study sessions.

## Features

- **Contextual Learning**: Replaces common English words with German equivalents based on your selected proficiency level (A1, A2, B1, B2).
- **Adjustable Density**: Control how many words are replaced per page with a "Translation Density" slider (1% to 100%).
- **Smart Grammar**: Respects German capitalization rules (nouns are always capitalized).
- **Interactive Tooltips**: Hover over any replaced word (highlighted) to see the original English word and the German article (der/die/das).
- **Progress Tracking**: Keeps track of how many words you've seen today and how many pages you've visited.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Xanoster/Deutschify.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the directory where you cloned this repository.

## Usage

1. Click the extension icon (🇩🇪) in your browser toolbar.
2. **Toggle** the switch to enable/disable the extension.
3. Select your **CEFR Level** (A1, A2, B1, B2) to determine which vocabulary set to use.
4. Adjust the **Translation Density** slider to control how much of the text should be "sprinkled" with German.
5. Browse the web as usual!

## Development

- `manifest.json`: Extension configuration (Manifest V3).
- `content.js`: Main logic for scanning the DOM and replacing words.
- `utils.js`: Helper functions for capitalization and word mapping.
- `vocabulary/`: core vocabulary lists organized by level.

## License

MIT
