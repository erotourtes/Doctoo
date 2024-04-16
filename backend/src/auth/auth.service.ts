import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  async signupUser(createUserDto: CreateUserDto): Promise<any> {
    const name = createUserDto.name;
    return { name };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = { email, password }; // TODO: use user service
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(token: string): Promise<any> {
    const user = { token }; // TODO: use user service
    if (user && user.token === token) {
      const { token: _, ...result } = user;
      return result;
    }
    return null;
  }
}
