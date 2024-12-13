import { Users } from '../database/entity/user.entity';
import { DatabaseException } from '../exceptions';
import { HelperJsonWebToken } from '../helpers/HelperJwt';

class AuthService {
  public helperJwt: HelperJsonWebToken | null = null;

  constructor() {
    this.helperJwt = new HelperJsonWebToken();
  }

  async registerUser(validData: {
    name: string;
    email: string;
    password: string;
  }) {
    const { name, email, password } = validData;

    const isEmail = await Users.findOne({
      where: { email },
    });

    const isName = await Users.findOne({
      where: { name },
    });

    if (isEmail || isName) {
      throw new DatabaseException(400, 'User already exist');
    }

    const genSalt = await this.helperJwt?.generateSalt();
    const hashPassword = await this.helperJwt?.hashPassword(
      password,
      genSalt as string
    );

    const storedResult = Users.create({
      name: name,
      email: email,
      password: hashPassword as any,
    }).save();

    console.log(storedResult);
    return storedResult;
  }

  async loginUser(validData: { email: string; password: string }) {
    const { email, password } = validData;

    const isUser = await Users.findOne({
      where: { email },
    });

    if (!isUser) {
      throw new DatabaseException(400, 'User not found');
    }

    const userSavePassword = isUser.password;
    const comparePassword = await this.helperJwt?.ComparePassword(
      password,
      userSavePassword as string
    );
    if (!comparePassword) {
      throw new DatabaseException(400, 'Password not match');
    }
    const paylaod: Partial<typeof isUser> = {
      ...isUser,
    };

    if (paylaod['password']) {
      delete paylaod['password'];
    }

    const newAccessToken = await this.helperJwt?.createAccessToken(paylaod);
    return {
      newAccessToken,
      ...isUser,
    };
  }
}

export default new AuthService();
