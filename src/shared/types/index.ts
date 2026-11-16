/**
 * Type Definitions
 *
 * Core type definitions and interfaces for the extension.
 */

/**
 * AI Provider Interface
 * Contract for all AI provider implementations
 */
export interface IAIProvider {
  name: string;
  isConfigured(): Promise<boolean>;
  testConnection(): Promise<boolean>;
  generateCompletion(prompt: string): Promise<string>;
  streamCompletion(prompt: string): AsyncIterableIterator<string>;
}

/**
 * Configuration Interface
 */
export interface IExtensionConfig {
  aiProvider: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Message Protocol for WebView Communication
 */
export interface IWebViewMessage {
  command: string;
  data?: any;
}

export interface IWebViewResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Sidebar View State
 */
export interface ISidebarState {
  isOpen: boolean;
  selectedProvider?: string;
  recentMessages?: string[];
}
