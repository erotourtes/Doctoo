import { Module } from '@nestjs/common';
import { FhirService } from './fhir.service';
import { FhirController } from './fhir.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [FhirController],
  imports: [HttpModule],
  providers: [FhirService],
})
export class FhirModule {}
