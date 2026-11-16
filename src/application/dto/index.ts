/**
 * Application DTOs
 *
 * Data Transfer Objects for communication between layers.
 * Defines the shape of data exchanged with the Presentation layer.
 */

/**
 * Message DTO
 */
export interface MessageDTO {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * AI Session DTO
 */
export interface AISessionDTO {
  id: string;
  title: string;
  messages: MessageDTO[];
  createdAt: string;
  lastModified: string;
}

/**
 * AI Completion Request DTO
 */
export interface CompletionRequestDTO {
  prompt: string;
  sessionId?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * AI Completion Response DTO
 */
export interface CompletionResponseDTO {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model?: string;
}

/**
 * Extension Configuration DTO
 */
export interface ConfigurationDTO {
  aiProvider: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  logLevel?: string;
}
