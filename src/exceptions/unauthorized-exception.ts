import { AppException } from './app-exception';

export class UnauthorizedException extends AppException {
  constructor() {
    super('User without permission', 401);
  }
}
