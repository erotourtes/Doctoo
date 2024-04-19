import type { Allergy, BloodType, Condition, Gender } from './PatientSlice';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarKey: string;
  weight: number;
  height: number;
  age: number;
  bloodType: BloodType;
  gender: Gender;
  declarationId: number;
  conditions: Condition[];
  allergies: Allergy[];
  country: string;
  state?: string;
  city: string;
  street: string;
  apartment?: string;
  zipCode?: number;
}

export default class PatientModel implements Patient {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public avatarKey: string,
    public weight: number,
    public height: number,
    public age: number,
    public bloodType: BloodType,
    public gender: Gender,
    public declarationId: number,
    public conditions: Condition[],
    public allergies: Allergy[],
    public country: string,
    public city: string,
    public street: string,
    public state?: string,
    public apartment?: string,
    public zipCode?: number,
  ) {}
}
