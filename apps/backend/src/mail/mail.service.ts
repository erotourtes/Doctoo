import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';

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
      template: './patient-signup',
      context: {
        name,
        url: `${this.configObject.FRONTEND_URL}/${this.configObject.FRONTEND_SIGNUP_PATH}?token=${token}`,
      },
    });
  }

  async sendMFACode(to: string, name: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Enable MFA for your account',
      template: './enable-mfa',
      context: { name, code },
    });
  }

  async sendEmailChangeMail(to: string, oldEmail: string, name: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Change email',
      template: './change-email',
      context: {
        name,
        oldEmail,
        url: `${this.configObject.FRONTEND_URL}/${this.configObject.FRONTEND_CHANGE_EMAIL_PATH}?token=${token}`,
      },
    });
  }
}
