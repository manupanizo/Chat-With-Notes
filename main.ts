import { App, Plugin, PluginSettingTab, Setting, Modal, Notice, TFile, SearchResult, requestUrl } from 'obsidian';

interface KagiFastGPTSettings {
	apiKey: string;
}

const DEFAULT_SETTINGS: KagiFastGPTSettings = {
	apiKey: ''
}

export default class KagiFastGPTPlugin extends Plugin {
	settings: KagiFastGPTSettings;

	async onload() {
		await this.loadSettings();

		// Add ribbon icon
		this.addRibbonIcon('message-circle', 'Chat with Notes', (evt: MouseEvent) => {
			new ChatModal(this.app, this).open();
		});

		// Add command
		this.addCommand({
			id: 'open-chat-modal',
			name: 'Open Chat with Notes',
			callback: () => {
				new ChatModal(this.app, this).open();
			}
		});

		// Add settings tab
		this.addSettingTab(new KagiFastGPTSettingTab(this.app, this));
	}

	onunload() {
		// Cleanup if needed
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async searchNotes(query: string): Promise<TFile[]> {
		const searchResults = this.app.vault.getMarkdownFiles().filter(file => {
			const content = this.app.vault.cachedRead(file);
			return content.then(text => 
				text.toLowerCase().includes(query.toLowerCase()) ||
				file.basename.toLowerCase().includes(query.toLowerCase())
			);
		});

		// For now, return first 10 files that match
		return searchResults.slice(0, 10);
	}

	async getNoteContent(file: TFile): Promise<string> {
		return await this.app.vault.cachedRead(file);
	}

	async callKagiFastGPT(query: string, context: string): Promise<any> {
		if (!this.settings.apiKey) {
			throw new Error('Kagi API key not configured. Please set it in plugin settings.');
		}

		const fullQuery = context ? 
			`Based on the following notes from my vault:\n\n${context}\n\nQuestion: ${query}` : 
			query;

		try {
			const response = await requestUrl({
				url: 'https://kagi.com/api/v0/fastgpt',
				method: 'POST',
				headers: {
					'Authorization': `Bot ${this.settings.apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: fullQuery
				})
			});

			return response.json;
		} catch (error) {
			console.error('Kagi API request failed:', error);
			throw new Error(`Failed to connect to Kagi API: ${error.message || 'Network error'}`);
		}
	}
}

class ChatModal extends Modal {
	plugin: KagiFastGPTPlugin;
	searchInput: HTMLInputElement;
	queryInput: HTMLTextAreaElement;
	resultsDiv: HTMLDivElement;
	chatDiv: HTMLDivElement;

	constructor(app: App, plugin: KagiFastGPTPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Chat with Your Notes' });

		// Search section
		const searchSection = contentEl.createDiv('search-section');
		searchSection.createEl('h3', { text: 'Search Notes' });
		
		this.searchInput = searchSection.createEl('input', {
			type: 'text',
			placeholder: 'Search your notes (e.g., #person, painting, artificial intelligence)'
		});
		this.searchInput.style.width = '100%';
		this.searchInput.style.marginBottom = '10px';

		const searchButton = searchSection.createEl('button', { text: 'Search Notes' });
		searchButton.onclick = () => this.performSearch();

		// Results section
		this.resultsDiv = contentEl.createDiv('search-results');
		this.resultsDiv.style.maxHeight = '200px';
		this.resultsDiv.style.overflowY = 'auto';
		this.resultsDiv.style.border = '1px solid var(--background-modifier-border)';
		this.resultsDiv.style.padding = '10px';
		this.resultsDiv.style.marginBottom = '20px';

		// Chat section
		const chatSection = contentEl.createDiv('chat-section');
		chatSection.createEl('h3', { text: 'Ask Question' });

		this.queryInput = chatSection.createEl('textarea', {
			placeholder: 'Ask a question about your notes...'
		});
		this.queryInput.style.width = '100%';
		this.queryInput.style.height = '80px';
		this.queryInput.style.marginBottom = '10px';

		const chatButton = chatSection.createEl('button', { text: 'Ask FastGPT' });
		chatButton.onclick = () => this.performChat();

		// Chat results
		this.chatDiv = contentEl.createDiv('chat-results');
		this.chatDiv.style.marginTop = '20px';
		this.chatDiv.style.padding = '10px';
		this.chatDiv.style.border = '1px solid var(--background-modifier-border)';
		this.chatDiv.style.borderRadius = '5px';
	}

	async performSearch() {
		const query = this.searchInput.value.trim();
		if (!query) {
			new Notice('Please enter a search query');
			return;
		}

		this.resultsDiv.empty();
		this.resultsDiv.createEl('p', { text: 'Searching...' });

		try {
			// Use Obsidian's search API
			const searchResults = this.app.vault.getMarkdownFiles().filter(file => {
				const cache = this.app.metadataCache.getFileCache(file);
				const content = cache?.sections?.map(s => s.type).join(' ') || '';
				const tags = cache?.tags?.map(t => t.tag).join(' ') || '';
				const fileName = file.basename;
				
				const searchText = `${fileName} ${content} ${tags}`.toLowerCase();
				return searchText.includes(query.toLowerCase());
			});

			this.resultsDiv.empty();
			
			if (searchResults.length === 0) {
				this.resultsDiv.createEl('p', { text: 'No notes found matching your search.' });
				return;
			}

			this.resultsDiv.createEl('p', { text: `Found ${searchResults.length} notes:` });
			
			const resultsList = this.resultsDiv.createEl('ul');
			searchResults.slice(0, 10).forEach(file => {
				const listItem = resultsList.createEl('li');
				listItem.createEl('strong', { text: file.basename });
				listItem.createSpan({ text: ` (${file.path})` });
			});

		} catch (error) {
			this.resultsDiv.empty();
			this.resultsDiv.createEl('p', { 
				text: `Search error: ${error.message}`,
				cls: 'error'
			});
		}
	}

	async performChat() {
		const query = this.queryInput.value.trim();
		if (!query) {
			new Notice('Please enter a question');
			return;
		}

		this.chatDiv.empty();
		this.chatDiv.createEl('p', { text: 'Thinking...' });

		try {
			// Get search results to use as context
			const searchQuery = this.searchInput.value.trim();
			let context = '';

			if (searchQuery) {
				const searchResults = this.app.vault.getMarkdownFiles().filter(file => {
					const cache = this.app.metadataCache.getFileCache(file);
					const content = cache?.sections?.map(s => s.type).join(' ') || '';
					const tags = cache?.tags?.map(t => t.tag).join(' ') || '';
					const fileName = file.basename;
					
					const searchText = `${fileName} ${content} ${tags}`.toLowerCase();
					return searchText.includes(searchQuery.toLowerCase());
				});

				// Get content from first few matching files
				const contextFiles = searchResults.slice(0, 5);
				const contextPromises = contextFiles.map(async file => {
					const content = await this.plugin.getNoteContent(file);
					return `## ${file.basename}\n${content}\n\n`;
				});

				const contextArray = await Promise.all(contextPromises);
				context = contextArray.join('');
			}

			// Call Kagi FastGPT
			const response = await this.plugin.callKagiFastGPT(query, context);

			// Display results
			this.chatDiv.empty();
			
			const answerDiv = this.chatDiv.createDiv();
			answerDiv.createEl('h4', { text: 'Answer:' });
			answerDiv.createEl('p', { text: response.data.output });

			if (response.data.references && response.data.references.length > 0) {
				const refsDiv = this.chatDiv.createDiv();
				refsDiv.createEl('h4', { text: 'References:' });
				const refsList = refsDiv.createEl('ul');
				
				response.data.references.forEach((ref: any) => {
					const listItem = refsList.createEl('li');
					const link = listItem.createEl('a', { 
						text: ref.title,
						href: ref.url
					});
					link.setAttribute('target', '_blank');
					listItem.createEl('p', { text: ref.snippet });
				});
			}

			const metaDiv = this.chatDiv.createDiv();
			metaDiv.style.fontSize = '0.8em';
			metaDiv.style.color = 'var(--text-muted)';
			metaDiv.style.marginTop = '10px';
			metaDiv.createSpan({ text: `Tokens used: ${response.data.tokens} | Response time: ${response.meta.ms}ms` });

		} catch (error) {
			this.chatDiv.empty();
			this.chatDiv.createEl('p', { 
				text: `Error: ${error.message}`,
				cls: 'error'
			});
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class KagiFastGPTSettingTab extends PluginSettingTab {
	plugin: KagiFastGPTPlugin;

	constructor(app: App, plugin: KagiFastGPTPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Kagi FastGPT Settings' });

		new Setting(containerEl)
			.setName('Kagi API Key')
			.setDesc('Enter your Kagi API key. Get one at https://kagi.com/settings/api')
			.addText(text => text
				.setPlaceholder('Enter your API key')
				.setValue(this.plugin.settings.apiKey)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('p', { 
			text: 'Note: FastGPT costs 1.5¢ per query. Make sure you have API credits at https://kagi.com/settings/billing_api'
		});
	}
}
