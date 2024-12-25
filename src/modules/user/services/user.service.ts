import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export class UserService {
  async registerUser(email: string, password: string) {
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: passwordHash });

    const token = this.generateJWTToken({
      id: user._id,
      email: email,
    });

    return { token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateJWTToken({
      id: user._id,
      email: email,
    });

    return { token };
  }

  private generateJWTToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    return token;
  }
}
