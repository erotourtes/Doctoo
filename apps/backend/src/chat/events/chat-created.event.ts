export class ChatCreatedEvent {
  readonly patientId: string;
  readonly doctorId: string;

  constructor(patientId: string, doctorId: string) {
    this.patientId = patientId;
    this.doctorId = doctorId;
  }
}
