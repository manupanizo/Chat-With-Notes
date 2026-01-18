# Chat With Notes Plugin for Obsidian with Kagi FastGPT

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/manupanizo/Chat-With-Notes?style=for-the-badge)](https://github.com/manupanizo/Chat-With-Notes/releases/latest)
[![GitHub All Releases](https://img.shields.io/github/downloads/manupanizo/Chat-With-Notes/total?style=for-the-badge)](https://github.com/manupanizo/Chat-With-Notes/releases)

Search your vault and get AI responses based on your note contents. In this initial version, the plugin allows you to submit one question about your notes and get a reply using Kagi's FastGPT API.

This is an unofficial plugin for Obsidian.

## Features

- **Search Integration**: Use Obsidian's search to find relevant notes by content, tags, or filenames
- **AI Chat**: Ask questions about your notes using Kagi's FastGPT API
- **Context-Aware**: Include found note contents in your AI queries for more relevant responses
- **Flexible Queries**: Filter by tags (e.g., #person), topics, or any search terms
- **Cost Effective**: Uses Kagi's FastGPT (see kagi.com for cost details)

## Use Cases

- Filter your notes by the `#person` tag, then ask about people in your personal CRM
- Ask about major themes in your notes or ideas from the past week
- Search topics like "painting" or "artificial intelligence" and have the AI summarize your knowledge
- Get insights from your research notes on specific subjects

## Setup

1. **Get a Kagi API Key**:
   - Create a Kagi account at [kagi.com](https://kagi.com/signup?plan_id=trial)
   - Navigate to Settings → Advanced → API portal or go to [kagi.com/settings/api](https://kagi.com/settings/api)
   - Click "Generate API Token"

2. **Add API Credits**:
   - Go to [kagi.com/settings/billing_api](https://kagi.com/settings/billing_api)
   - Add credits

3. **Configure the Plugin**:
   - Open Obsidian Settings → Community Plugins → Kagi FastGPT Chat
   - Enter your API key

## Usage

1. **Open the Chat Interface**:
   - Click the chat icon in the ribbon, or
   - Use the command palette: "Chat with Notes"

2. **Search Your Notes**:
   - Enter search terms in the "Search Notes" field
   - Examples: `#person`, `artificial intelligence`, `painting`, `meeting notes`
   - Click "Search Notes" to find matching files

3. **Ask Questions**:
   - Enter your question in the "Ask Question" field
   - The AI will use your found notes as context
   - Click "Ask FastGPT" to get a response

## Installation

### Manual Installation

1. Download the latest release files from the [Releases page](https://github.com/manupanizo/Chat-With-Notes/releases/latest)
2. Copy `main.js`, `manifest.json`, and `styles.css` to your vault's `.obsidian/plugins/kagi-fastgpt-chat/` folder
3. Enable the plugin in Obsidian Settings → Community Plugins


### Development

1. Clone this repository to your vault's plugins folder
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development mode
4. Enable the plugin in Obsidian


## Privacy

This plugin sends your note contents to Kagi's FastGPT API only when you explicitly ask questions. Your API key is stored locally in Obsidian. Review Kagi's privacy policy for details on how they handle your data.

## Support

For issues with this plugin, please create an issue on GitHub.
For Kagi API issues, contact Kagi at kagifeedback.org.
