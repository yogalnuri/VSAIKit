/**
 * Domain Entities
 *
 * Core business objects representing domain concepts.
 * These should be independent of any framework.
 */

/**
 * Message Entity
 * Represents a message in the AI conversation
 */
export class Message {
  constructor(
    public id: string,
    public content: string,
    public role: 'user' | 'assistant',
    public timestamp: Date,
    public metadata?: Record<string, any>
  ) {}

  public static create(
    content: string,
    role: 'user' | 'assistant',
    metadata?: Record<string, any>
  ): Message {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return new Message(id, content, role, new Date(), metadata);
  }
}

/**
 * AISession Entity
 * Represents an AI conversation session
 */
export class AISession {
  private messages: Message[] = [];
  private createdAt: Date = new Date();
  private lastModified: Date = new Date();

  constructor(
    public id: string,
    public title: string
  ) {}

  public addMessage(message: Message): void {
    this.messages.push(message);
    this.lastModified = new Date();
  }

  public getMessages(): Message[] {
    return [...this.messages];
  }

  public getLastMessage(): Message | undefined {
    return this.messages[this.messages.length - 1];
  }

  public getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  public getLastModified(): Date {
    return new Date(this.lastModified);
  }

  public static create(title: string): AISession {
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return new AISession(id, title);
  }
}
