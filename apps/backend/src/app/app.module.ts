import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from '../appointment/appointment.module';
import { AuthModule } from '../auth/auth.module';
import auth from '../config/auth';
import config from '../config/config';
import { DoctorModule } from '../doctor/doctor.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { FileModule } from '../file/file.module';
import { HospitalModule } from '../hospital/hospital.module';
import { MinioService } from '../minio/minio.service';
import { PatientModule } from '../patient/patient.module';
import { UserModule } from '../user/user.module';
import { DeclarationModule } from '../declaration/declaration.module';
import { SpecializationModule } from '../specialization/specialization.module';
import mail from '../config/mail';
import { MailModule } from '../mail/mail.module';
import { ConditionModule } from 'src/condition/condition.module';
import { AllergyModule } from 'src/allergy/allergy.module';
import { PaymentModule } from '../payment/payment.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [auth, config, mail] }),
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
    ConditionModule,
    AllergyModule,
    PaymentModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
