import { User } from '../database/entity/user.entity';
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

    const isEmail = await User.findOne({
      where: { email },
    });

    const isName = await User.findOne({
      where: { name },
    });

    const isExists = await Promise.all([isEmail, isName]);

    if (isExists.length > 0) {
      throw new DatabaseException(400, 'User already exists');
    }

    const genSalt = await this.helperJwt?.generateSalt();
    const hashPassword = this.helperJwt?.hashPassword(
      password,
      genSalt as string
    );
    const userConfig = {
      name,
      password: hashPassword,
      email,
    };
    const newUser = new User();
    newUser.name = userConfig.name;
    newUser.password = userConfig.password as any;
    newUser.email = userConfig.email;
    return await newUser.save();
  }

  async loginUser(validData: { email: string; password: string }) {
    const { email, password } = validData;

    const isUser = await User.findOne({
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

    const paylaod = {
      ...isUser,
    };

    const newAccessToken = await this.helperJwt?.createAccessToken(paylaod);
    return {
      newAccessToken,
      ...isUser,
    };
  }
}

export default new AuthService();
