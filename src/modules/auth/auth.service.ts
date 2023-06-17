import { AuthDTO } from './dtos/auth.dto';
import { getUserByEmail } from '@modules/user/user.service';
import { validatePassword } from '@utils/password';
import { NotFoundException } from '@exceptions/not-found-exception';
import { AuthModel } from './auth.model';
import { generateToken } from '@utils/auth';

export const validateAuth = async (authDto: AuthDTO): Promise<AuthModel> => {
  const user = await getUserByEmail(authDto.email);

  const isValidPassword = await validatePassword(authDto.password, user.password);

  if (!isValidPassword) {
    throw new NotFoundException('User');
  }

  return new AuthModel(generateToken(user), user);
};
