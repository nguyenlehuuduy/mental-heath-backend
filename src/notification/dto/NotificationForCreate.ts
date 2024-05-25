import { ApiProperty } from '@nestjs/swagger';

export class NotificationForCreate {
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
  thumbnailNoti: string;

  @ApiProperty()
  typeName: string;
}
