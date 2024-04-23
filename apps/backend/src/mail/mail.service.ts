import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import config from '../config/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(config.KEY) private readonly configObject: ConfigType<typeof config>,
  ) {}

  async sendPatientSignUpMail(to: string, name: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: `Welcome to the ${this.configObject.APP_NAME}!`,
      template: './patient-sign-up-step',
      context: {
        name,
        url: `${this.configObject.APP_URL}/auth/patient/signup/${token}`,
      },
    });
  }
}