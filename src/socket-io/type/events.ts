import { Message } from "../dto/message";

export interface ServerToClientEvent {
  newMessage: (payload: Message) => void
}