import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class NotificationForUpdate {
  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsOptional()
  @IsString()
  postShareId?: string;

  @IsOptional()
  @IsString()
  commentId?: string;

  @IsOptional()
  @IsString()
  reactionId?: string;

  @IsOptional()
  @IsString()
  followerId?: string;

  @IsOptional()
  @IsString()
  messageNotifications?: string;

  @IsOptional()
  @Type()
  typeNotificationId?: string;
}
