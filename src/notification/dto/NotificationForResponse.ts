import { ApiProperty } from '@nestjs/swagger';

export class NotificationForResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  postId?: string;

  @ApiProperty()
  postShareId?: string;

  @ApiProperty()
  commentId?: string;

  @ApiProperty()
  reactionId?: string;

  @ApiProperty()
  followerId?: string;

  @ApiProperty()
  messageNotifications?: string;

  @ApiProperty()
  typeNotificationId: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
