/**
 * Application Services - AI Service
 *
 * Business logic layer for AI operations.
 * Orchestrates between domain and infrastructure layers.
 */

import { IAIProvider, IExtensionConfig } from '@shared/types';
import { AIProviderFactory } from '@infrastructure/ai/providerFactory';
import { ExtensionLogger } from '@shared/utils/logger';

export class AIService {
  private logger = ExtensionLogger.getInstance();
  private provider?: IAIProvider;
  private factory = AIProviderFactory.getInstance();

  /**
   * Initialize the AI service with configuration
   */
  public async initialize(config: IExtensionConfig): Promise<void> {
    try {
      this.provider = this.factory.createProvider(config);

      const isConfigured = await this.provider.isConfigured();
      if (!isConfigured) {
        throw new Error('AI Provider is not properly configured');
      }

      const connectionOk = await this.provider.testConnection();
      if (!connectionOk) {
        throw new Error('Failed to connect to AI Provider');
      }

      this.logger.info('AI Service initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize AI Service', error);
      throw error;
    }
  }

  /**
   * Get a completion from the AI provider
   */
  public async getCompletion(prompt: string): Promise<string> {
    if (!this.provider) {
      throw new Error('AI Service not initialized');
    }

    try {
      const completion = await this.provider.generateCompletion(prompt);
      this.logger.debug('Completion generated', { promptLength: prompt.length });
      return completion;
    } catch (error) {
      this.logger.error('Failed to get completion', error);
      throw error;
    }
  }

  /**
   * Stream a completion from the AI provider
   */
  public async *streamCompletion(prompt: string): AsyncIterableIterator<string> {
    if (!this.provider) {
      throw new Error('AI Service not initialized');
    }

    try {
      yield* this.provider.streamCompletion(prompt);
    } catch (error) {
      this.logger.error('Failed to stream completion', error);
      throw error;
    }
  }

  /**
   * Check if the service is ready
   */
  public isReady(): boolean {
    return this.provider !== undefined;
  }

  /**
   * Get the current provider name
   */
  public getProviderName(): string {
    return this.provider?.name ?? 'Unknown';
  }
}
