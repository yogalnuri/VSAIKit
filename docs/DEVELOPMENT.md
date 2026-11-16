# Development Setup Guide

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **VS Code**: 1.85.0 or higher
- **Git**: Latest version

### Installation Commands

```bash
# Verify versions
node --version    # Should be v18+
npm --version     # Should be 9+
code --version    # Should be 1.85+
```

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ai-vscode-extension.git
cd ai-vscode-extension
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- TypeScript compiler
- Development tools (ESLint, Prettier, esbuild)
- VS Code types and testing framework
- Extension dependencies

### 3. Build for Development

```bash
npm run esbuild:dev
```

## Development Workflow

### Starting Development

```bash
# Terminal 1: Watch for changes and rebuild
npm run esbuild:watch

# Terminal 2: Keep another terminal for running commands
npm run lint:fix
npm run format
```

### Debugging in VS Code

1. Open the extension folder in VS Code
2. Press `F5` or go to **Run → Start Debugging**
3. A new VS Code window opens with the extension loaded
4. Set breakpoints in TypeScript files
5. Interact with the extension to hit breakpoints

### Available Debug Configurations

The `.vscode/launch.json` provides debug configurations for:
- Main extension debugging
- Test debugging

## Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Automatically fix issues
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format:check

# Apply formatting
npm run format
```

### Type Checking

```bash
# Compile TypeScript
npm run compile

# Watch mode for continuous checking
npm run watch
```

### Pre-commit Hook (Optional)

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint && npm run format:check
EOF

chmod +x .git/hooks/pre-commit
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
npm run test:unit
npm run test:integration
```

### Debug Tests

```bash
# Set breakpoints and run with debugging
npm test -- --inspect-brk
```

### Writing Tests

```typescript
// src/tests/unit/myFeature.test.ts
suite('My Feature Tests', () => {
  test('Should do something', () => {
    // Your test
  });
});
```

## Build Artifacts

### Development Build

```bash
npm run esbuild:dev
```
- Outputs to `dist/extension.js`
- Includes source maps
- Faster builds

### Production Build

```bash
npm run esbuild:prod
```
- Outputs to `dist/extension.js`
- Minified
- Optimized for size

### Watch Mode

```bash
npm run esbuild:watch
```
- Automatically rebuilds on file changes
- Great for rapid development

## Packaging & Distribution

### Create VSIX Package

```bash
# Development version
npm run package:dev

# Release version
npm run package
```

Creates `ai-vscode-extension.vsix` ready for:
- Local installation
- VS Code Marketplace
- Distribution

### Install Local VSIX

```bash
# In VS Code
1. Open Extensions panel (Ctrl+Shift+X)
2. Click "..." menu
3. "Install from VSIX..."
4. Select the .vsix file
```

## Troubleshooting

### "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript compilation errors

```bash
# Check TypeScript configuration
npm run compile

# Verify tsconfig.json is valid
cat tsconfig.json
```

### ESLint issues

```bash
# Check ESLint configuration
npm run lint -- --debug

# Fix all auto-fixable issues
npm run lint:fix
```

### Build issues

```bash
# Clean build
npm run clean
npm install
npm run esbuild:dev
```

### Debugging not working

1. Ensure breakpoints are in TypeScript, not compiled JavaScript
2. Check that `sourceMap: true` in tsconfig.json
3. Rebuild with `npm run esbuild:dev`
4. Restart debug session

## Environment Variables

Create `.env.local` for local configuration:

```env
AI_PROVIDER=mock
DEBUG=ai-extension:*
```

## VS Code Settings

Recommended `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["typescript"],
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Git Workflow

### Create a Feature Branch

```bash
git checkout -b feat/my-feature
git add .
git commit -m "feat: add my feature"
git push origin feat/my-feature
```

### Create a Pull Request

1. Push your branch
2. Create PR on GitHub
3. CI/CD runs automatically
4. Request review
5. Merge when approved

## Common Tasks

### Add a New Dependency

```bash
npm install package-name
# or for dev dependency
npm install --save-dev package-name
```

### Update Dependencies

```bash
npm update
# or check what can be updated
npm outdated
```

### Clean Everything

```bash
npm run clean
```

## Performance Tips

1. **Use esbuild:watch** during development for fast rebuilds
2. **Close other VS Code windows** when debugging
3. **Disable extensions** in debug window if performance is slow
4. **Use source maps** for accurate debugging

## Learning Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)

## Getting Help

1. Check existing issues on GitHub
2. Read relevant documentation
3. Search Stack Overflow
4. Ask in VS Code community
