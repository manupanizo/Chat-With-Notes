# Contributing to Obsidian Kagi FastGPT Plugin

Thank you for your interest in contributing to this plugin! Here are some guidelines to help you get started.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manupanizo/Chat-With-Notes.git
   cd Chat-With-Notes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Development workflow**:
   ```bash
   npm run dev    # Start development mode with file watching
   npm run build  # Build for production
   ```

4. **Testing**:
   - Copy the built files to your Obsidian vault's plugins folder
   - Enable the plugin in Obsidian settings
   - Test your changes

## Project Structure

```
obsidian-kagi-fastgpt/
├── main.ts              # Main plugin source code
├── manifest.json        # Plugin metadata
├── styles.css           # Plugin styles
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── esbuild.config.mjs   # Build configuration
├── README.md            # Documentation
├── INSTALLATION.md      # Installation guide
└── CONTRIBUTING.md      # This file
```

## Code Guidelines

- Use TypeScript for all source code
- Follow Obsidian's plugin development best practices
- Add proper error handling for API calls
- Include JSDoc comments for public methods
- Test changes thoroughly before submitting

## Submitting Changes

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test them
4. **Commit your changes**: `git commit -m "Add your feature description"`
5. **Push to your fork**: `git push origin feature/your-feature-name`
6. **Create a Pull Request**

## Issues and Feature Requests

- Use GitHub Issues to report bugs or request features
- Provide clear reproduction steps for bugs
- Include your Obsidian version and plugin version

## API Key Security

- Never commit API keys to the repository
- Use environment variables or secure storage for testing
- The plugin stores API keys locally in Obsidian settings

## Release Process

Releases are created using GitHub Actions when a new tag is pushed:

1. Update version in `manifest.json` and `package.json`
2. Create a git tag: `git tag -a v1.0.1 -m "Release v1.0.1"`
3. Push the tag: `git push origin v1.0.1`
4. GitHub Actions will create a release with built files

## Questions?

Feel free to open an issue for any questions about contributing!
