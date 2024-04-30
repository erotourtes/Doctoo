export enum Role {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarKey: string;
  role?: Role | any;
}
