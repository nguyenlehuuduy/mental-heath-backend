export class PostForCreate {
  contentText: string;
  accountId: string;
  imagePaths?: Array<string>;
  permissionPostId: string;
}

export class ImageUploadForPost {
  accountId: string;
  path: string;
  typeImageId?: string;
}
