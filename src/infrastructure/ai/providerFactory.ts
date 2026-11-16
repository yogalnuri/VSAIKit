/**
 * AI Provider Factory
 *
 * Factory pattern for creating AI provider instances.
 * Manages provider lifecycle and configuration.
 */

import { IAIProvider, IExtensionConfig } from '@shared/types';
import { AI_PROVIDERS } from '@shared/constants';
import { MockAIProvider } from './baseProvider';
import { ExtensionLogger } from '@shared/utils/logger';

export class AIProviderFactory {
  private static instance: AIProviderFactory;
  private logger = ExtensionLogger.getInstance();
  private currentProvider?: IAIProvider;

  private constructor() {
    // Singleton pattern
  }

  public static getInstance(): AIProviderFactory {
    if (!AIProviderFactory.instance) {
      AIProviderFactory.instance = new AIProviderFactory();
    }
    return AIProviderFactory.instance;
  }

  /**
   * Create an AI provider based on configuration
   */
  public createProvider(config: IExtensionConfig): IAIProvider {
    const provider = this.instantiateProvider(config.aiProvider);

    if (!provider) {
      this.logger.warn(`Provider ${config.aiProvider} not found, using Mock provider`);
      return new MockAIProvider();
    }

    this.currentProvider = provider;
    this.logger.info(`AI Provider created: ${provider.name}`);

    return provider;
  }

  /**
   * Get the current active provider
   */
  public getCurrentProvider(): IAIProvider | undefined {
    return this.currentProvider;
  }

  /**
   * Instantiate a provider by name
   */
  private instantiateProvider(providerName: string): IAIProvider | null {
    switch (providerName.toLowerCase()) {
      case AI_PROVIDERS.MOCK:
        return new MockAIProvider();
      default:
        return null;
    }
  }
}
