# Repository instructions

## Build and verification

- CI uses Node.js 20 and `npm ci`.
- `npm run compile` runs TypeScript in strict mode and emits into `dist/`; it also overwrites `dist/extension.js` with an unbundled file. Run `npm run esbuild:dev` afterwards for F5 debugging with source maps, or `npm run esbuild:prod` for the minified extension bundle. `npm run esbuild:watch` rebuilds the bundle on changes.
- `npm run lint` runs ESLint and permits up to 20 warnings; `npm run lint:fix` applies automatic fixes. The Prettier scripts currently contain escaped quotes that can prevent glob matching; use `npx prettier --check "src/**/*.ts"` or `npx prettier --write "src/**/*.ts"` instead.
- `npm test` invokes compilation and linting through `pretest`, but its configured `dist/test/runTest.js` path does not match the emitted `dist/tests/runTest.js`. The test tsconfig excludes `*.test.ts`, while the Mocha suite searches for `.test.ts` under the output directory. The `test:unit` and `test:integration` scripts use the same incorrect path and their filters are not consumed by the runner. Do not treat these scripts as evidence that tests passed without fixing the pipeline and verifying test counts.
- To run one existing non-VS-Code unit test independently, bundle it to CommonJS and use Mocha's TDD interface:
  ```sh
  npx esbuild src/tests/unit/aiService.test.ts --bundle --platform=node --format=cjs --outfile=.copilot-test.cjs
  npx mocha --ui tdd .copilot-test.cjs --grep "Should initialize with mock provider"
  ```
  Remove `.copilot-test.cjs` afterwards. This technique does not run tests requiring the VS Code extension host.
- `npm run package` and `npm run publish` invoke `vsce`, but `@vscode/vsce` is not currently declared. Marketplace publisher and repository metadata are placeholders; the contributed activity-bar icon is also absent.
- F5 uses `.vscode/launch.json` and runs the development bundle task. Note that `package.json` declares `"type": "module"` while esbuild emits CommonJS as `dist/extension.js`; verify extension-host loading when changing module or build configuration.

## Architecture and integration

- `src/extension.ts` is the VS Code composition root: it registers the sidebar provider and creates the central webview and command registry. Commands and view IDs are coupled across `package.json`, `src/shared/constants/index.ts`, and the presentation layer. The registered `openWebview` command is not currently contributed in the manifest.
- Presentation owns VS Code commands and webviews. The sidebar and central panel use inline HTML and webview messages; shared message shapes live in `src/shared/types/index.ts`. UI message handlers are placeholders and are not wired to the AI service.
- The intended layers are presentation, application, domain, infrastructure, and shared. Domain entities and repository contracts are independent of VS Code. In the current implementation `AIService` directly obtains the infrastructure singleton `AIProviderFactory`, and the `IAIProvider` contract resides in shared types; distinguish this existing dependency from the intended Clean Architecture direction.
- The factory only implements `MockAIProvider`; unknown provider names currently fall back to it. Genkit and real provider integrations are not installed or implemented. The service checks configuration and connectivity during initialization and delegates completion/streaming to its provider.
- TypeScript imports use the `@presentation/*`, `@application/*`, `@domain/*`, `@infrastructure/*`, and `@shared/*` aliases defined in `tsconfig.json`. esbuild resolves them when bundling, but plain `tsc` does not rewrite them for Node at runtime.
- Register VS Code disposables in `context.subscriptions`, use the existing `ExtensionLogger` for extension logging, and keep contributed command/view identifiers consistent when adding surfaces.
- Follow the repository's Prettier settings (single quotes, semicolons, two-space indentation) and Conventional Commits documented in `CONTRIBUTING.md`.
