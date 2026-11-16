/**
 * Repository Interfaces
 *
 * Domain-level interfaces that define data access contracts.
 * Implementations reside in the Infrastructure layer.
 */

/**
 * AI Provider Repository Interface
 * Defines contract for persisting and retrieving AI provider configurations
 */
export interface IAIProviderRepository {
  /**
   * Get provider configuration by name
   */
  getProvider(name: string): Promise<any | null>;

  /**
   * Save provider configuration
   */
  saveProvider(name: string, config: any): Promise<void>;

  /**
   * List all configured providers
   */
  listProviders(): Promise<string[]>;
}

/**
 * Message History Repository Interface
 * Defines contract for storing and retrieving conversation history
 */
export interface IMessageHistoryRepository {
  /**
   * Save a message to history
   */
  addMessage(message: any): Promise<void>;

  /**
   * Get message history
   */
  getHistory(limit?: number): Promise<any[]>;

  /**
   * Clear all history
   */
  clearHistory(): Promise<void>;
}
