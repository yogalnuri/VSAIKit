# Contributing

Thank you for your interest in contributing to the AI VS Code Extension!

## Development Setup

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup instructions.

## Code Style

- **TypeScript**: Strict mode enabled, always use types
- **Format**: Prettier (run `npm run format`)
- **Lint**: ESLint (run `npm run lint`)
- **Tests**: Write tests for new features

## Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feat/my-feature`
3. **Make your changes**
4. **Run quality checks**:
   ```bash
   npm run lint:fix
   npm run format
   npm run compile
   npm test
   ```
5. **Commit with clear message**: `git commit -m "feat: add my feature"`
6. **Push and create PR**: `git push origin feat/my-feature`
7. **Wait for CI/CD** to pass
8. **Request review**
9. **Merge when approved**

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Example:
```
feat(ai-service): add streaming completion support

- Implement async iterator pattern for streaming
- Add error handling and logging
- Add tests for streaming functionality

Closes #123
```

## Architecture Guidelines

- **Clean Architecture**: Keep layers separated
- **Domain First**: Domain logic should be framework-agnostic
- **DRY**: Don't repeat yourself
- **SOLID Principles**: Apply SOLID principles
- **Type Safety**: Use TypeScript types, avoid `any`

## Adding Features

1. **Create an issue** describing the feature
2. **Wait for feedback** before starting work
3. **Design the solution** considering Clean Architecture
4. **Implement incrementally** with tests
5. **Update documentation** (README.md, ARCHITECTURE.md)
6. **Submit PR** with reference to the issue

## Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create detailed issue** with:
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Node version, VS Code version)
   - Screenshots/logs if applicable

## Questions?

- Check [ARCHITECTURE.md](docs/ARCHITECTURE.md) for architecture questions
- Check [DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup/development questions
- Open an issue with `[question]` label

## Code Review

All contributions are reviewed for:
- Code quality and style
- Test coverage
- Architecture compliance
- Documentation
- Performance implications
- Security considerations

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
