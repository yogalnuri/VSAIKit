/**
 * Shared Logger Utility
 *
 * Centralized logging service for the extension.
 * Provides structured logging with different severity levels.
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class ExtensionLogger {
  private static instance: ExtensionLogger;
  private logLevel: LogLevel = LogLevel.INFO;
  private outputChannel: any;

  private constructor() {
    // Singleton pattern
  }

  public static getInstance(): ExtensionLogger {
    if (!ExtensionLogger.instance) {
      ExtensionLogger.instance = new ExtensionLogger();
    }
    return ExtensionLogger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  public error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, error);
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    if (data) {
      console.log(logEntry, data);
    } else {
      console.log(logEntry);
    }
  }
}
