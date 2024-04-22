export enum BloodType {
  O_PLUS = 'O+',
  O_MINUS = 'O-',
  A_PLUS = 'A+',
  A_MINUS = 'A-',
  B_PLUS = 'B+',
  B_MINUS = 'B-',
  AB_PLUS = 'AB+',
  AB_MINUS = 'AB-',
}

export interface IPatient {
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

export enum Gender {
  MALE = 'male',
  FEMALE = ' female',
}

export type Condition = {
  id: string;
  name: string;
};

export type Allergy = {
  id: string;
  name: string;
};
