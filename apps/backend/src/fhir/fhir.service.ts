import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CreateFhirDto } from './dto/create-fhir.dto';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class FhirService {
  constructor(private httpService: HttpService) {}

  fetchPatientData(patientId: string, body: CreateFhirDto): Observable<AxiosResponse<any>> {
    const url = `${body.serverUrl}/Patient/${patientId}`;
    try {
      return this.httpService
        .get(url, {
          headers: {
            Accept: 'application/fhir+json',
            Authorization: `Bearer ${body.token}`,
          },
        })
        .pipe(
          map(response => response.data),
          catchError(error =>
            throwError(
              () =>
                new BadRequestException(
                  `Failed to fetch patient data: ${error?.response?.statusText || error.message}`,
                ),
            ),
          ),
        );
    } catch (error) {
      return error;
    }
  }

  fetchObservationData(patientId, body: CreateFhirDto): Observable<any> {
    const queryParams = new URLSearchParams({
      patient: patientId,
      subject: patientId,
      category: 'vital-signs',
      code: '29463-7',
      date: '2021-01-01',
    }).toString();

    const url = `${body.serverUrl}/Observation?${queryParams}`;
    try {
      return this.httpService
        .get(url, {
          headers: {
            Accept: 'application/fhir+json',
            Authorization: `Bearer ${body.token}`,
          },
        })
        .pipe(
          map(response => response.data),
          catchError(error =>
            throwError(
              () =>
                new BadRequestException(
                  `Failed to fetch patient data: ${error?.response?.statusText || error.message}`,
                ),
            ),
          ),
        );
    } catch (error) {
      return error;
    }
  }
}
