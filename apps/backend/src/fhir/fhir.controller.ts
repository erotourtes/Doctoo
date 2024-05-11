import { Body, Controller, Param, Post } from '@nestjs/common';
import { FhirService } from './fhir.service';
import { CreateFhirDto } from './dto/create-fhir.dto';

@Controller('fhir')
export class FhirController {
  constructor(private readonly fhirService: FhirService) {}

  @Post('/patient/:patientId')
  fetchPatient(@Param('patientId') patientId: string, @Body() body: CreateFhirDto) {
    return this.fhirService.fetchPatientData(patientId, body);
  }

  @Post('/observation/:patientId')
  fetchObservation(@Param('patientId') patientId: string, @Body() body: CreateFhirDto) {
    return this.fhirService.fetchObservationData(patientId, body);
  }
}
