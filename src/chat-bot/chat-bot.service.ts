import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { MessageForSendBot } from './dto/MessageForSendBot';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageBotForResponse } from './dto/MessageBotForResponse';

@Injectable()
export class ChatBotService {
  constructor(private prismaService: PrismaService) {}
  async sendMessageToBOT(
    account: AccountForToken,
    messageForSendBot: MessageForSendBot,
  ): Promise<MessageBotForResponse> {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const contentSend = await this.prismaService.messages.create({
      data: {
        contentText: messageForSendBot.contentText,
        roomId: messageForSendBot.roomId,
        ownerId: account.id,
      },
    });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: contentSend.contentText,
        },
      ],
      temperature: 0.7,
    });
    const contentResponse = await this.prismaService.messages.create({
      data: {
        contentText: response.choices[0].message.content ?? '',
        roomId: messageForSendBot.roomId,
        ownerId: process.env.ID_CHAT_BOT,
      },
    });
    return contentResponse;
  }
}
