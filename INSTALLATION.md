# Installation Guide - Kagi FastGPT Chat Plugin

## Prerequisites

1. **Obsidian** - Make sure you have Obsidian installed
2. **Kagi Account** - You need a Kagi account with API access
3. **API Credits** - FastGPT costs 1.5¢ per query

## Step 1: Get Kagi API Key

1. Create a Kagi account at [kagi.com/signup](https://kagi.com/signup?plan_id=trial)
2. Go to [kagi.com/settings/api](https://kagi.com/settings/api)
3. Click "Generate API Token"
4. Copy your API key (keep it secure!)

## Step 2: Add API Credits

1. Go to [kagi.com/settings/billing_api](https://kagi.com/settings/billing_api)
2. Add credits to your account
3. Each query costs 1.5¢ ($15 per 1000 queries)

## Step 3: Install the Plugin

### Method A: Manual Installation (Recommended for Testing)

1. Copy the plugin files to your Obsidian vault:
   ```
   YourVault/.obsidian/plugins/kagi-fastgpt-chat/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```

2. In Obsidian:
   - Go to Settings → Community Plugins
   - Turn off "Safe mode" if it's enabled
   - Click "Refresh" to detect the new plugin
   - Find "Kagi FastGPT Chat" and enable it

### Method B: Development Installation

1. Clone/copy this repository to your vault's plugins folder:
   ```bash
   cd /path/to/your/vault/.obsidian/plugins/
   git clone [repository-url] kagi-fastgpt-chat
   cd kagi-fastgpt-chat
   npm install
   npm run build
   ```

2. Enable the plugin in Obsidian settings

## Step 4: Configure the Plugin

1. In Obsidian, go to Settings → Community Plugins → Kagi FastGPT Chat
2. Enter your Kagi API key in the settings
3. Save the settings

## Step 5: Test the Plugin

1. **Open the Chat Interface**:
   - Click the chat bubble icon in the ribbon, OR
   - Use Command Palette (Cmd/Ctrl+P) → "Chat with Notes"

2. **Test Search**:
   - Enter a search term like "meeting" or "#project"
   - Click "Search Notes"
   - Verify it finds relevant notes

3. **Test Chat**:
   - Enter a question like "What are the main themes in my notes?"
   - Click "Ask FastGPT"
   - Verify you get a response

## Troubleshooting

### Plugin Not Appearing
- Make sure all files are in the correct folder
- Restart Obsidian
- Check that Safe Mode is disabled

### API Errors
- Verify your API key is correct
- Check you have sufficient API credits
- Ensure you have internet connection

### Search Not Working
- Try different search terms
- Make sure you have markdown files in your vault
- Check the console (Cmd/Ctrl+Shift+I) for errors

### No Response from FastGPT
- Check your API key and credits
- Verify the search found relevant notes
- Check the console for error messages

## File Structure

```
kagi-fastgpt-chat/
├── main.js              # Compiled plugin code
├── main.ts              # Source TypeScript code
├── manifest.json        # Plugin metadata
├── styles.css           # Plugin styles
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── esbuild.config.mjs   # Build configuration
├── versions.json        # Version compatibility
├── version-bump.mjs     # Version management
├── README.md            # Documentation
├── INSTALLATION.md      # This file
└── .gitignore          # Git ignore rules
```

## Usage Examples

### Example 1: Personal CRM
1. Search: `#person`
2. Question: "Who are the most important people in my network?"

### Example 2: Research Summary
1. Search: `artificial intelligence`
2. Question: "Summarize my research on AI and machine learning"

### Example 3: Project Review
1. Search: `#project meeting`
2. Question: "What are the key decisions from recent project meetings?"

### Example 4: Learning Review
1. Search: `#learning #book`
2. Question: "What are the main concepts I've learned from books recently?"

## Support

- For plugin issues: Check the console and create an issue
- For Kagi API issues: Contact support@kagi.com
- For general questions: Review the README.md
