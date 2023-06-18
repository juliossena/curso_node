import { UnauthorizedException } from '@exceptions/unauthorized-exception';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { UserModel } from '@modules/user/user.model';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

export const PASSWORD_JWT = 'umasenhamuitograndedepoismudar';

export const generateToken = (user: UserModel): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      typeUser: user.typeUser,
    } as UserAuth,
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: '604800000',
    },
  );
};

export const verifyToken = async (authorization?: string): Promise<UserAuth> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = <UserAuth>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<UserAuth> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
