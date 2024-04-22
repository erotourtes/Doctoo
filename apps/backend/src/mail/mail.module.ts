import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import mail from '../config/mail';
import config from '../config/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (mailConfig: ConfigType<typeof mail>, configObject: ConfigType<typeof config>) => ({
        transport: {
          host: mailConfig.MAIL_HOST,
          port: 587,
          secure: configObject.NODE_ENV === 'production',
          auth: {
            user: mailConfig.MAIL_USER,
            pass: mailConfig.MAIL_PASS,
          },
        },
        defaults: {
          from: {
            address: mailConfig.MAIL_FROM,
            name: 'No Reply',
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
      inject: [mail.KEY, config.KEY],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
