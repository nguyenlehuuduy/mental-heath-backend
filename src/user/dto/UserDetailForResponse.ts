import { Profile } from "./ProfileResponse";

export class UserDetailForResponse {
  user: Profile;
  objectCount: {
    posts: number,
    followers: number,
    followings: number,
    postShares: number,
    images: number,
    RequestFollow: number
  };
  follower: Array<{
    id: string,
    fullName: string,
    avata: string,
    nickName: string
  }>;
  followings: Array<{
    id: string,
    fullName: string,
    avata: string,
    nickName: string
  }>;
  image: Array<{
    path: string,
    postId: string,
    typeImage: {
      typeImageName: string
    }
  }>
}