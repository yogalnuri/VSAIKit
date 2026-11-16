# Architecture Guide

## Overview

This extension follows **Clean Architecture** principles, separating concerns into distinct layers with unidirectional dependencies.

## Layers

### 1. Presentation Layer (`src/presentation/`)

**Responsibility**: User interaction and UI

- **Sidebar** (`sidebar/sidebarProvider.ts`)
  - Manages the sidebar webview
  - Handles user interactions in the sidebar
  - Communicates with Application layer

- **WebView** (`webview/webviewProvider.ts`)
  - Manages main webview panel
  - Presents detailed UI
  - Sends/receives messages

- **Commands** (`commands/commandRegistry.ts`)
  - Registers VS Code commands
  - Delegates to appropriate services
  - No business logic

**Key Principle**: Thin layer, no business logic

### 2. Application Layer (`src/application/`)

**Responsibility**: Orchestrating use cases and business processes

- **Services** (`services/aiService.ts`)
  - `AIService` - Orchestrates AI operations
  - Coordinates Domain and Infrastructure layers
  - Handles errors and logging

- **DTOs** (`dto/`)
  - Data Transfer Objects
  - Shapes data for Presentation layer
  - Type-safe communication

**Key Principle**: Coordinates between layers, no low-level implementation details

### 3. Domain Layer (`src/domain/`)

**Responsibility**: Pure business logic and domain models

- **Entities** (`entities/`)
  - Core business objects
  - Encapsulate domain rules

- **Value Objects** (`valueobjects/`)
  - Immutable objects
  - Define semantics of domain concepts

- **Repositories** (`repositories/`)
  - Interfaces only
  - Define data access contracts
  - Never concrete implementations

**Key Principle**: Independent of any framework or library

### 4. Infrastructure Layer (`src/infrastructure/`)

**Responsibility**: External service integration

- **AI Providers** (`ai/`)
  - `BaseAIProvider` - Abstract base class
  - `MockAIProvider` - Mock implementation for testing
  - `AIProviderFactory` - Creates provider instances
  - Extensible for new providers

- **Configuration** (`config/`)
  - Reads configuration
  - Environment setup
  - Validation

- **Logger** (`logger/`)
  - Logging implementation
  - Could be extended to use external services

**Key Principle**: Implementation details of external services

### 5. Shared Layer (`src/shared/`)

**Responsibility**: Cross-cutting utilities and types

- **Types** (`types/index.ts`)
  - Interfaces used across layers
  - Type definitions
  - No implementations

- **Constants** (`constants/index.ts`)
  - Global constants
  - Configuration keys
  - Command names

- **Utils** (`utils/`)
  - Helper functions
  - Utilities used by multiple layers

**Key Principle**: No business logic, only utilities

## Dependency Flow

```
┌─────────────────────────────────────────────────────┐
│ Presentation Layer                                  │
│ (Sidebar, WebView, Commands)                        │
└──────────────────┬──────────────────────────────────┘
                   │ depends on
                   ▼
┌─────────────────────────────────────────────────────┐
│ Application Layer                                   │
│ (Services, Use Cases)                               │
└──────────────────┬──────────────────────────────────┘
                   │ depends on
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│ Domain Layer     │  │ Infrastructure   │
│ (Entities,       │  │ (AI Providers,   │
│  Value Objects)  │  │  Config, Logger) │
└──────────────────┘  └──────────────────┘
         │                   │
         └─────────┬─────────┘
                   │ depends on
                   ▼
┌─────────────────────────────────────────────────────┐
│ Shared Layer                                        │
│ (Types, Constants, Utils)                           │
└─────────────────────────────────────────────────────┘
```

## Communication Patterns

### Presentation → Application

```typescript
// In SidebarProvider
const aiService = new AIService();
await aiService.initialize(config);
const result = await aiService.getCompletion(prompt);
this.sendMessage({ result });
```

### Application → Domain

```typescript
// In AIService (Application)
const provider = this.factory.createProvider(config); // Infrastructure
const completion = await provider.generateCompletion(prompt); // Domain contract
```

### Application → Infrastructure

```typescript
// In AIService
// Uses interfaces from Domain
// Implementations come from Infrastructure
const provider: IAIProvider = factory.createProvider(config);
```

## Adding New Features

### Example: Adding a New Command

1. **Create domain logic** (if needed)
2. **Create application service** to orchestrate
3. **Register command** in CommandRegistry
4. **Add to presentation layer** (sidebar/webview)

### Example: Adding a New AI Provider

1. Create provider in `src/infrastructure/ai/newProvider.ts`
   ```typescript
   export class NewProvider extends BaseAIProvider { }
   ```

2. Register in `AIProviderFactory.instantiateProvider()`

3. Update constants in `src/shared/constants/index.ts`

4. Add configuration in `package.json`

## Testing Strategy

- **Unit Tests**: Test individual services in isolation
- **Integration Tests**: Test layer interactions
- **Fixtures**: Mock data in `src/tests/fixtures/`

## Extension Points

### Adding a Repository

1. Define interface in `src/domain/repositories/`
2. Implement in `src/infrastructure/`
3. Inject into services

### Adding Logging Destinations

1. Extend `ExtensionLogger`
2. Add new transport (file, remote, etc.)

### Adding Configuration

1. Add to `package.json` `configuration.properties`
2. Create getter in config service
3. Use in appropriate layer

## Best Practices

1. **Never bypass layers** - Always go through the dependency chain
2. **Keep Domain pure** - No VS Code API, no external calls
3. **Type everything** - Use TypeScript strict mode
4. **Single Responsibility** - Each class has one reason to change
5. **Dependency Injection** - Inject dependencies, don't create them
6. **Test in isolation** - Mock dependencies for unit tests

## Glossary

- **Entity**: Object with unique identity, lifecycle
- **Value Object**: Immutable, defined by its values
- **Service**: Stateless operations orchestrator
- **DTO**: Data Transfer Object for communication
- **Repository**: Data access abstraction
- **Factory**: Creates objects (providers, services)
