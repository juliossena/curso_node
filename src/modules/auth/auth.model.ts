import { UserModel } from '@modules/user/user.model';

export class AuthModel {
  token: string;
  user: UserModel;

  constructor(token: string, user: UserModel) {
    this.token = token;
    this.user = user;
  }
}
