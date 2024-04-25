import { ApiProperty } from '@nestjs/swagger';

class HospitalDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

class SpecializationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

class HospitalNestedDto {
  @ApiProperty({ type: HospitalDto })
  hospital: HospitalDto;
}

class SpecializationNestedDto {
  @ApiProperty({ type: SpecializationDto })
  specialization: SpecializationDto;
}

export class UserPartialDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  avatarKey: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;
}

export class PartialDoctorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  payrate: number;

  @ApiProperty()
  about: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: UserPartialDto })
  user: UserPartialDto;

  @ApiProperty({ type: [SpecializationNestedDto] })
  specializations: SpecializationNestedDto;

  @ApiProperty({ type: [HospitalNestedDto] })
  hospitals: HospitalNestedDto;
}

export class PartialDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  doctorId: string;

  @ApiProperty()
  assignedAt: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  paymentInvoiceKey: string;

  @ApiProperty()
  paymentReceiptKey: string;

  @ApiProperty()
  startedAt: string;

  @ApiProperty()
  endedAt: string;

  @ApiProperty({ type: PartialDoctorDto })
  doctor: PartialDoctorDto;
}

export class FlatResponseAppointmentDto {
  @ApiProperty({ type: PartialDto })
  appointment: PartialDto;
}