import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/decorator/role.enum';
import { MessageForSendBot } from './dto/MessageForSendBot';

@Controller('chat-bot')
@ApiBearerAuth('Authorization')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Roles(Role.User)
export class ChatBotController {
  constructor(private chatbotServie: ChatBotService) {}
  @Post()
  async sendMessages(
    @Request() req,
    @Body() messageForSendBot: MessageForSendBot,
  ) {
    return this.chatbotServie.sendMessageToBOT(req?.user, messageForSendBot);
  }
}
