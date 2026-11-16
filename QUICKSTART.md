# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Clone & Install

```bash
cd ai-vscode-extension
npm install
```

### 2. Start Development

```bash
npm run esbuild:watch
```

In VS Code, press **F5** to launch the extension in debug mode.

### 3. Run Your First Command

1. In the debug VS Code window, open Command Palette (Ctrl+Shift+P)
2. Run `AI Extension: Hello World`
3. You'll see a notification: "Hello World! AI Extension is active."

## 📁 Project Structure Highlights

```
src/
├── extension.ts                 # Extension entry point
├── presentation/sidebar/        # Sidebar UI
├── application/services/        # AI Service (business logic)
├── domain/                      # Domain entities & contracts
├── infrastructure/ai/           # AI providers (Mock, OpenAI, etc.)
└── shared/                      # Types, constants, utils
```

## 🔧 Available Commands

```bash
# Development
npm run esbuild:watch           # Watch & rebuild
npm run esbuild:dev             # Build with sourcemaps
npm run esbuild:prod            # Production build

# Quality
npm run lint                    # ESLint check
npm run lint:fix                # Auto-fix issues
npm run format                  # Prettier format
npm run compile                 # TypeScript check

# Testing
npm test                        # Run all tests
npm run test:unit               # Unit tests only
npm run test:integration        # Integration tests only

# Packaging
npm run package                 # Create VSIX (release)
npm run package:dev             # Create VSIX (pre-release)
```

## 🎯 Key Files to Explore

| File | Purpose |
|------|---------|
| [src/extension.ts](src/extension.ts) | Extension activation & setup |
| [src/application/services/aiService.ts](src/application/services/aiService.ts) | AI orchestration layer |
| [src/infrastructure/ai/baseProvider.ts](src/infrastructure/ai/baseProvider.ts) | AI provider abstraction |
| [src/presentation/sidebar/sidebarProvider.ts](src/presentation/sidebar/sidebarProvider.ts) | Sidebar UI |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture explanation |

## 🛠️ Common Development Tasks

### Add a New Command

1. Edit `src/presentation/commands/commandRegistry.ts`
2. Add `registerYourCommand()` method
3. Run `npm run lint:fix`
4. Test with F5 in VS Code

### Add Tests

Create a file in `src/tests/unit/yourTest.test.ts`:

```typescript
suite('Your Feature Tests', () => {
  test('Should do something', () => {
    // Your test
  });
});
```

Run with: `npm test`

### Create a New AI Provider

1. Create `src/infrastructure/ai/yourProvider.ts`
2. Extend `BaseAIProvider`
3. Implement required methods
4. Register in `AIProviderFactory`

## 🐛 Debugging Tips

- **Breakpoints**: Set breakpoints in TypeScript files while debugging
- **Console**: Use `ExtensionLogger` for structured logging
- **Sourcemaps**: Enabled in dev build, disabled in production
- **Watch Mode**: Use `npm run esbuild:watch` for fast rebuilds

## 📚 Documentation

- **[README.md](README.md)** - Full project overview
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Clean Architecture explanation
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Detailed development guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## 🚀 Next Steps

1. ✅ Understand Clean Architecture (see [ARCHITECTURE.md](docs/ARCHITECTURE.md))
2. ✅ Explore the Sidebar & WebView implementations
3. ✅ Implement your AI provider in `src/infrastructure/ai/`
4. ✅ Add tests for your features
5. ✅ Publish to VS Code Marketplace

## ❓ Troubleshooting

**Module not found errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
npm run compile
```

**Linting issues?**
```bash
npm run lint:fix
```

## 🔗 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [VS Code Marketplace Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## 💡 Tips

- Use path aliases (`@presentation/*`, `@application/*`, etc.) for cleaner imports
- Keep Domain layer pure - no external dependencies
- Write tests as you develop features
- Use the logger for debugging instead of console.log

---

Happy coding! 🎉
