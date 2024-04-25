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
  userId: string;
  weight: number;
  height: number;
  age: number;
  bloodType: BloodType;
  gender: Gender;
  identityCardKey: string;
  country: string;
  state?: string;
  city: string;
  street: string;
  apartment?: string;
  zipCode?: string;
  conditions: Condition[];
  vaccinations: Vaccination[];
  allergies: Allergy[];
  emailNotificationToggle: boolean;
  twoFactorAuthToggle: boolean;
  requestBillPaymentApproval: boolean;
}

export enum Gender {
  MALE = 'male',
  FEMALE = ' female',
}

export type Vaccination = {
  id: string;
  name: string;
};

export type Condition = {
  id: string;
  name: string;
};

export type Allergy = {
  id: string;
  name: string;
};
