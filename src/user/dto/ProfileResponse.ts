export class Profile {
  id: string;
  fullName: string;
  phone: string;
  aboutMe: string;
  nickName: string;
  birth: Date;
  address: string;
  avata: string;
  banner?: string;
  email?: string;
  favorite?: Array<{
    id: string;
    nameFavorite: string;
  }>;
}
