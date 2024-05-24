export class ContentSearchForResponse {
  id: string;
  contentText: string;
  account: {
    fullName: string;
    id: string;
    avata: string
  }
  created_at: Date | string;
  updated_at: Date | string;
  images?: Array<{
    path: string
  }>;
}
