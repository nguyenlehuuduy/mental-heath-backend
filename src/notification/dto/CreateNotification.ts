import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateNotification {
  @IsString()
  accountId: string;

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

  @ApiProperty({
    required: false,
  })
  created_at?: Date

  @ApiProperty({
    required: false,
  })
  updated_at?: Date

  @Type()
  typeNotificationId: string;
}