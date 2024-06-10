
export class NotificationForResponse {
  account?: Array<{
    id: string,
    fullName: string,
  }>;
  id: string;
  postId?: string;
  postShareId?: string;
  commentId?: string;
  reactionId?: string;
  followerId?: string;
  messageNotifications?: string;
  typeNotification?: {
    id: string;
    thumbnailNoti: string;
    typeName: string;
    description: string;
  }
  created_at: Date;
  updated_at: Date;
}
