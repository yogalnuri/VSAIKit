# Project Structure Documentation

## Complete Directory Tree

```
ai-vscode-extension/
├── .github/
│   └── workflows/                    # GitHub Actions CI/CD
│       ├── build.yml                 # Build & test on all platforms
│       ├── quality.yml               # Code quality checks
│       └── release.yml               # Release & publish workflow
│
├── .vscode/
│   ├── launch.json                   # Debug configurations
│   ├── tasks.json                    # VS Code tasks
│   ├── settings.json                 # Workspace settings
│   └── extensions.json               # Recommended extensions
│
├── docs/
│   ├── ARCHITECTURE.md               # Clean Architecture explanation
│   └── DEVELOPMENT.md                # Development setup guide
│
├── media/                            # Icons, images, etc.
│
├── src/
│   ├── extension.ts                  # Extension entry point
│   │
│   ├── presentation/                 # UI Layer
│   │   ├── sidebar/
│   │   │   └── sidebarProvider.ts    # Sidebar webview
│   │   ├── webview/
│   │   │   └── webviewProvider.ts    # Main webview panel
│   │   └── commands/
│   │       └── commandRegistry.ts    # Command registration
│   │
│   ├── application/                  # Business Logic Layer
│   │   ├── services/
│   │   │   └── aiService.ts          # AI service orchestration
│   │   └── dto/
│   │       └── index.ts              # Data Transfer Objects
│   │
│   ├── domain/                       # Domain Layer (Business Rules)
│   │   ├── entities/
│   │   │   └── index.ts              # Domain entities (Message, AISession)
│   │   ├── repositories/
│   │   │   └── index.ts              # Repository interfaces (contracts)
│   │   └── valueobjects/             # Value objects (future)
│   │
│   ├── infrastructure/               # External Services Layer
│   │   ├── ai/
│   │   │   ├── baseProvider.ts       # Base AI provider class
│   │   │   └── providerFactory.ts    # Factory for creating providers
│   │   ├── config/                   # Configuration management
│   │   └── logger/                   # Logging implementation
│   │
│   ├── shared/                       # Cross-cutting Utilities
│   │   ├── types/
│   │   │   └── index.ts              # Interfaces & type definitions
│   │   ├── constants/
│   │   │   └── index.ts              # Global constants
│   │   └── utils/
│   │       └── logger.ts             # Logger utility
│   │
│   └── tests/                        # Test Suite
│       ├── runTest.ts                # Test runner entry point
│       ├── unit/
│       │   ├── extension.test.ts     # Extension activation tests
│       │   └── aiService.test.ts     # AI Service tests
│       ├── integration/              # Integration tests
│       ├── suite/
│       │   └── index.ts              # Test suite loader
│       └── fixtures/                 # Test fixtures & mocks
│
├── dist/                             # Compiled output (git ignored)
│   ├── extension.js                  # Minified bundle
│   └── extension.js.map              # Source map
│
├── node_modules/                     # Dependencies (git ignored)
│
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc.json                  # Prettier configuration
├── .prettierignore                   # Prettier ignore rules
├── .gitignore                        # Git ignore rules
├── .vscodeignore                     # VSIX ignore rules
│
├── package.json                      # Project metadata & scripts
├── package-lock.json                 # Dependency lock file
├── tsconfig.json                     # TypeScript configuration
│
├── README.md                         # Full documentation
├── QUICKSTART.md                     # Quick start guide
├── CONTRIBUTING.md                   # Contribution guidelines
└── CHANGELOG.md                      # Version history
```

## Layer Responsibilities

### Presentation Layer (`src/presentation/`)
- **Sidebar**: Webview for the activity bar sidebar
- **WebView**: Main panel webview for detailed UI
- **Commands**: VS Code command registration and execution
- **Responsibility**: Handle user interactions, delegate to Application layer

### Application Layer (`src/application/`)
- **AIService**: Orchestrates AI operations
- **DTOs**: Define data shapes for communication
- **Responsibility**: Coordinate between Presentation and Domain layers

### Domain Layer (`src/domain/`)
- **Entities**: Business objects (Message, AISession)
- **Repositories**: Data access contracts (interfaces only)
- **ValueObjects**: Immutable domain objects
- **Responsibility**: Pure business logic, no external dependencies

### Infrastructure Layer (`src/infrastructure/`)
- **AI Providers**: Actual AI service implementations
  - `BaseAIProvider`: Abstract base class
  - `MockAIProvider`: For testing
  - Future: OpenAI, Anthropic, Gemini, etc.
- **Config**: Configuration and environment setup
- **Logger**: Logging implementation
- **Responsibility**: External service integration

### Shared Layer (`src/shared/`)
- **Types**: Interfaces and type definitions
- **Constants**: Global constants and configuration keys
- **Utils**: Helper functions and utilities
- **Responsibility**: Reusable components for all layers

## File Naming Conventions

- **Components/Classes**: PascalCase (e.g., `SidebarProvider.ts`)
- **Interfaces**: PascalCase with I prefix (e.g., `IAIProvider`)
- **Functions/Methods**: camelCase (e.g., `getCompletion()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `EXTENSION_NAME`)
- **Test files**: `*.test.ts`

## Import Path Aliases

```typescript
// Instead of relative paths:
import { SidebarProvider } from '../../../presentation/sidebar';

// Use aliases:
import { SidebarProvider } from '@presentation/sidebar/sidebarProvider';
```

Available aliases:
- `@presentation/*` → `src/presentation/*`
- `@application/*` → `src/application/*`
- `@domain/*` → `src/domain/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@shared/*` → `src/shared/*`

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, scripts, dependencies |
| `tsconfig.json` | TypeScript compiler configuration |
| `.eslintrc.json` | ESLint rules and configuration |
| `.prettierrc.json` | Code formatting rules |
| `.vscode/launch.json` | VS Code debugging configuration |
| `.vscode/settings.json` | Workspace editor settings |
| `.github/workflows/*.yml` | CI/CD automation |

## Build Output

```
dist/
├── extension.js      # Minified bundled extension (~9KB)
└── extension.js.map  # Source map for debugging
```

The `dist/extension.js` is loaded by VS Code when the extension is activated.

## Development vs Production

**Development Build**
- Includes source maps
- Faster compilation
- Larger file size

**Production Build**
- Minified & optimized
- No source maps
- Smaller file size (~9KB)

## Dependency Organization

```
node_modules/
├── @types/              # TypeScript type definitions
├── @vscode/             # VS Code APIs and tools
├── esbuild/             # TypeScript bundler
├── eslint/              # Linter
├── prettier/            # Code formatter
├── typescript/          # TypeScript compiler
└── ... (other dependencies)
```

## Testing Structure

```
src/tests/
├── unit/                # Unit tests (isolated components)
├── integration/         # Integration tests (component interactions)
├── fixtures/            # Test data and mocks
└── suite/               # Test runner configuration
```

## Scripts Organization

See `package.json` for full list:
- **Build**: `esbuild:*` commands
- **Quality**: `lint`, `format`, `compile`
- **Testing**: `test`, `test:unit`, `test:integration`
- **Packaging**: `package`, `package:dev`
- **Maintenance**: `clean`

## Adding New Files

When adding a new file:

1. **Choose the right layer** based on responsibility
2. **Follow naming conventions** (PascalCase for classes)
3. **Add JSDoc comments** for public APIs
4. **Keep single responsibility** principle
5. **Write tests** for new functionality
6. **Update documentation** if needed

Example structure for a new provider:

```typescript
// src/infrastructure/ai/openaiProvider.ts
export class OpenAIProvider extends BaseAIProvider {
  name = 'OpenAI';
  
  async isConfigured(): Promise<boolean> { /* ... */ }
  async testConnection(): Promise<boolean> { /* ... */ }
  async generateCompletion(prompt: string): Promise<string> { /* ... */ }
  async *streamCompletion(prompt: string): AsyncIterableIterator<string> { /* ... */ }
}

// Register in AIProviderFactory
// Update AI_PROVIDERS constant
// Add configuration to package.json
```

---

For more information, see:
- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture explanation
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development workflow
- [README.md](../README.md) - Full documentation
