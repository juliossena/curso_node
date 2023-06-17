import { AppException } from './app-exception';

export class NotFoundException extends AppException {
  constructor(entity: string) {
    super(`${entity} not found`);
  }
}
