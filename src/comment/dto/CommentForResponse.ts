export class CommentForResponse {
  id: string;
  contentCmt: string;
  accountId: string;
  created_at: Date | string;
  updated_at: Date | string;
  account?: {
    id: string,
    fullName: string,
    avata: string,
    nickName: string
  }
}
