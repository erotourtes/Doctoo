import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<any> {
    const user = { email, password }; // TODO: use user service
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
