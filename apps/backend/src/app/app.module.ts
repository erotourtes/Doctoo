import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AllergyModule } from 'src/allergy/allergy.module';
import { ConditionModule } from 'src/declaration/condition/condition.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { AuthModule } from '../auth/auth.module';
import auth from '../config/auth';
import config from '../config/config';
import mail from '../config/mail';
import { DeclarationModule } from '../declaration/declaration.module';
import { DoctorModule } from '../doctor/doctor.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { FileModule } from '../file/file.module';
import { HospitalModule } from '../hospital/hospital.module';
import { MailModule } from '../mail/mail.module';
import { MinioService } from '../minio/minio.service';
import { PatientModule } from '../patient/patient.module';
import { PaymentModule } from '../payment/payment.module';
import { ReviewModule } from '../review/review.module';
import { SpecializationModule } from '../specialization/specialization.module';
import { UserModule } from '../user/user.module';
import { AppLoggerModule } from '../app-logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [auth, config, mail] }),
    EventEmitterModule.forRoot(),
    AuthModule,
    MailModule,
    UserModule,
    FavoriteModule,
    DoctorModule,
    PatientModule,
    FileModule,
    HospitalModule,
    AppointmentModule,
    DeclarationModule,
    SpecializationModule,
    ReviewModule,
    ConditionModule,
    AllergyModule,
    PaymentModule,
    AppLoggerModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
