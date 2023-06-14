import { Message, Role } from "./types.ts";

export class Conversation {
  messages: Message[] = [];

  addMessage(role: Role, content: string, name?: string) {
    const message: Message = { role, content, name };
    this.messages.push(message);
  }

  displayConversation() {
    this.messages.forEach((message: Message) => {
      console.log(`${message.role}: ${message.content}\n\n`);
    });
  }
}
