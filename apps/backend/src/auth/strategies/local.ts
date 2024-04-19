import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Strategy } from 'passport-local';
import { ResponseWithoutRelationsUserDto } from '../../user/dto/responseWithoutRelations';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // TODO: Is it's really necessary?
  }

  async validate(email: string, password: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('Invalid auth credentials');

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }
}

export class LocalAuthGuard extends AuthGuard('local') {}
