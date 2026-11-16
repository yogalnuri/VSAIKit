/**
 * Application Constants
 *
 * Global constants used across the extension.
 */

export const EXTENSION_NAME = 'ai-extension';

export const COMMANDS = {
  HELLO_WORLD: `${EXTENSION_NAME}.helloWorld`,
  OPEN_SIDEBAR: `${EXTENSION_NAME}.openSidebar`,
  OPEN_WEBVIEW: `${EXTENSION_NAME}.openWebview`,
} as const;

export const CONFIG_KEYS = {
  AI_PROVIDER: `${EXTENSION_NAME}.aiProvider`,
  API_KEY: `${EXTENSION_NAME}.apiKey`,
  MODEL: `${EXTENSION_NAME}.model`,
  TEMPERATURE: `${EXTENSION_NAME}.temperature`,
  MAX_TOKENS: `${EXTENSION_NAME}.maxTokens`,
} as const;

export const AI_PROVIDERS = {
  MOCK: 'mock',
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GEMINI: 'gemini',
} as const;

export const WEBVIEW_COMMANDS = {
  GET_STATE: 'getState',
  SET_STATE: 'setState',
  SEND_MESSAGE: 'sendMessage',
  CLEAR_HISTORY: 'clearHistory',
} as const;
