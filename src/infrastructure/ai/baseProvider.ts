/**
 * AI Provider Interface
 *
 * Domain contract for all AI provider implementations.
 * This is an abstraction that allows plugging different AI providers.
 */

import { IAIProvider } from '@shared/types';

/**
 * Base abstract class for AI providers
 * Implements common functionality and defines the contract
 */
export abstract class BaseAIProvider implements IAIProvider {
  abstract name: string;

  abstract isConfigured(): Promise<boolean>;

  abstract testConnection(): Promise<boolean>;

  abstract generateCompletion(prompt: string): Promise<string>;

  abstract streamCompletion(prompt: string): AsyncIterableIterator<string>;

  /**
   * Validates that the provider is properly configured
   */
  protected validateConfiguration(): void {
    if (!this.name) {
      throw new Error('AI Provider must have a name');
    }
  }
}

/**
 * Mock AI Provider for development and testing
 */
export class MockAIProvider extends BaseAIProvider {
  name = 'Mock Provider';

  async isConfigured(): Promise<boolean> {
    return true;
  }

  async testConnection(): Promise<boolean> {
    return true;
  }

  async generateCompletion(prompt: string): Promise<string> {
    return `Mock response to: "${prompt}"`;
  }

  async *streamCompletion(prompt: string): AsyncIterableIterator<string> {
    const response = `Mock streaming response to: "${prompt}"`;
    for (const char of response) {
      yield char;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
}
