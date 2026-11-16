# AI VS Code Extension

Professional VS Code extension with Clean Architecture, TypeScript, and Genkit AI integration foundation.

## Features

- 🏗️ **Clean Architecture** - Presentation, Application, Domain, Infrastructure, and Shared layers
- 🔌 **AI Provider Abstraction** - Ready for Genkit and multiple AI providers
- 🎨 **Sidebar & WebView** - Built-in UI components
- 📦 **VSIX Ready** - Pre-configured for VS Code Marketplace
- 🧪 **Test Framework** - Unit and integration tests with @vscode/test-electron
- 🔧 **TypeScript** - Full type safety with strict mode
- 🎯 **CI/CD Ready** - GitHub Actions workflows included
- 📱 **Cross-platform** - Windows, macOS, and Linux support

## Project Structure

```
src/
├── extension.ts              # Extension entry point
├── presentation/             # UI Layer
│   ├── sidebar/             # Sidebar webview
│   ├── webview/             # Main webview panel
│   └── commands/            # Command registry
├── application/             # Business Logic Layer
│   ├── services/            # Application services
│   └── dto/                 # Data transfer objects
├── domain/                  # Domain Layer
│   ├── entities/            # Domain entities
│   ├── repositories/        # Repository interfaces
│   └── valueobjects/        # Value objects
├── infrastructure/          # Infrastructure Layer
│   ├── ai/                  # AI providers
│   ├── config/              # Configuration
│   └── logger/              # Logging
├── shared/                  # Shared Utilities
│   ├── types/               # Type definitions
│   ├── constants/           # Constants
│   └── utils/               # Utilities
└── tests/                   # Test Suite
    ├── unit/                # Unit tests
    ├── integration/         # Integration tests
    └── fixtures/            # Test fixtures
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- VS Code 1.85+

### Installation

```bash
# Clone and navigate
git clone <repository>
cd ai-vscode-extension

# Install dependencies
npm install

# Build for development
npm run esbuild:dev

# Start development with file watching
npm run esbuild:watch
```

### Development

Press `F5` in VS Code to launch the extension in debug mode.

**Available Commands:**

- `AI Extension: Hello World` - Test command
- `AI Extension: Open Sidebar` - Open the sidebar
- `AI Extension: Open WebView` - Open the webview panel

### Scripts

```bash
# Build
npm run compile              # Compile TypeScript
npm run esbuild:dev         # Development build with sourcemaps
npm run esbuild:prod        # Production build (minified)
npm run esbuild:watch       # Watch mode during development

# Quality
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues
npm run format              # Format code with Prettier
npm run format:check        # Check formatting

# Testing
npm run test                # Run all tests
npm run test:unit           # Run unit tests
npm run test:integration    # Run integration tests

# Packaging
npm run package             # Create VSIX package
npm run package:dev         # Create dev VSIX (pre-release)
npm run publish             # Publish to VS Code Marketplace

# Maintenance
npm run clean               # Remove build artifacts
```

## Architecture Overview

### Clean Architecture Layers

#### 1. **Presentation Layer** (`src/presentation/`)
- Handles all UI interactions (sidebar, webview, commands)
- No business logic
- Delegates to Application layer

#### 2. **Application Layer** (`src/application/`)
- Orchestrates business processes
- Contains use cases and services
- Coordinates between Presentation and Domain layers

#### 3. **Domain Layer** (`src/domain/`)
- Pure business logic
- Entities, value objects, and repository interfaces
- No external dependencies

#### 4. **Infrastructure Layer** (`src/infrastructure/`)
- External service integrations (AI providers, logging, config)
- Implements domain repository interfaces
- Handles external communication

#### 5. **Shared Layer** (`src/shared/`)
- Cross-cutting utilities, types, and constants
- Logging, type definitions
- No business logic

## AI Provider Integration

The extension uses an abstraction for AI providers, making it easy to add new ones.

### Current Providers

- **Mock Provider** - For development and testing (default)

### Adding a New Provider

1. Create a new provider in `src/infrastructure/ai/`:

```typescript
export class NewAIProvider extends BaseAIProvider {
  name = 'New Provider';

  async isConfigured(): Promise<boolean> {
    // Check if configured
  }

  async testConnection(): Promise<boolean> {
    // Test connection
  }

  async generateCompletion(prompt: string): Promise<string> {
    // Implementation
  }

  async *streamCompletion(prompt: string): AsyncIterableIterator<string> {
    // Implementation
  }
}
```

2. Register in `AIProviderFactory`:

```typescript
case AI_PROVIDERS.NEW:
  return new NewAIProvider();
```

3. Initialize in the sidebar or webview when needed.

## Testing

The project includes a test framework with support for unit and integration tests.

### Running Tests

```bash
npm test                    # All tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
```

### Test Structure

- Unit tests: `src/tests/unit/`
- Integration tests: `src/tests/integration/`
- Test fixtures: `src/tests/fixtures/`

## CI/CD Pipeline

Three GitHub Actions workflows are configured:

1. **Build & Test** (`build.yml`)
   - Runs on push and PRs
   - Tests on Windows, macOS, and Linux
   - Packages the extension

2. **Code Quality** (`quality.yml`)
   - ESLint validation
   - Prettier format checking
   - TypeScript compilation

3. **Release & Publish** (`release.yml`)
   - Triggered on version tags
   - Creates GitHub release
   - Publishes to VS Code Marketplace

## Configuration

### Extension Settings

Add to `package.json` `contributes.configuration`:

```json
"configuration": {
  "properties": {
    "ai-extension.aiProvider": {
      "type": "string",
      "default": "mock",
      "description": "AI Provider to use"
    }
  }
}
```

## Publishing to VS Code Marketplace

1. Update version in `package.json`
2. Create a release tag: `git tag v0.1.0`
3. Push tags: `git push --tags`
4. GitHub Actions will automatically:
   - Run tests
   - Build extension
   - Create release
   - Publish to marketplace (requires `VSCE_TOKEN`)

### Prerequisites for Publishing

1. VS Code Marketplace account
2. Publisher name in `package.json`
3. Personal Access Token (PAT) stored as `VSCE_TOKEN` secret

## Development Tools

### TypeScript Path Aliases

The project is configured with path aliases for cleaner imports:

```typescript
// Instead of:
import { SidebarProvider } from '../../../presentation/sidebar/sidebarProvider';

// Use:
import { SidebarProvider } from '@presentation/sidebar/sidebarProvider';
```

Available aliases:
- `@presentation/*` → `src/presentation/*`
- `@application/*` → `src/application/*`
- `@domain/*` → `src/domain/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@shared/*` → `src/shared/*`

## Debugging

### VSCode Debugging

1. Open the extension in debug mode (F5)
2. Set breakpoints in TypeScript files
3. Debug console opens automatically

### Logging

Use the centralized logger:

```typescript
import { ExtensionLogger } from '@shared/utils/logger';

const logger = ExtensionLogger.getInstance();
logger.info('Message');
logger.error('Error', error);
```

## Best Practices

1. **Type Safety**: Always use TypeScript types, no `any`
2. **Error Handling**: Use try-catch and log errors
3. **Separation of Concerns**: Keep layers independent
4. **Testing**: Write tests for new features
5. **Documentation**: Add JSDoc comments to public APIs

## Dependencies

### Core
- `@types/vscode` - VS Code API types
- `vscode-nls` - Internationalization support
- `vscode-uri` - URI utilities

### UI
- `@vscode/webview-ui-toolkit` - VSCode UI components

### Development
- `typescript` - Language
- `esbuild` - Bundler
- `eslint` - Linter
- `prettier` - Formatter
- `@vscode/test-electron` - Test runner

## Future Enhancements

- [ ] Genkit AI integration
- [ ] Multiple AI provider support (OpenAI, Anthropic, Gemini)
- [ ] Persistent configuration
- [ ] Message history storage
- [ ] Prompt templates
- [ ] Code analysis features
- [ ] Custom theme support
- [ ] Internationalization (i18n)

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For issues and feature requests, please open an issue on GitHub.
