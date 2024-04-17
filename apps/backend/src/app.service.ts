import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
