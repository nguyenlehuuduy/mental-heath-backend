import { PaginationAndFilter } from 'src/common/schema/pagination';
import { UserForResponse } from 'src/user/dto/UserForResponse';
import { ImagePostForResponse } from './ImagePostForResponse';

export class PostForResponse {
  id: string;
  contentText: string;
  accountId: string;
  account: UserForResponse;
  created_at: Date | string;
  updated_at: Date | string;
  totalReaction: number;
  totalComment: number;
  totalShare: number;
  images?: Array<ImagePostForResponse>;
  is_liked?: boolean;
  comment_recent?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
  all_comment?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
    content: string;
  }>;
  all_like_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  all_share_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  permissionPost?: {
    code: string,
    description: string;
    id: string
  }
}

export class PostForFullResponse {
  data: Array<PostForResponse>;
  pagination: PaginationAndFilter;
}
