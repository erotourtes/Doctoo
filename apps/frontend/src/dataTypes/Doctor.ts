export interface Specialization {
  id: string;
  name: string;
}

export interface Hospital {
  name: string;
  country: string;
  state?: string | null;
  city: string;
  street: string;
  apartment: string;
  zipCode: number;
}

export interface IDoctor {
  id: string;
  userId: string;
  payrate: number;
  about: string;
  firstName: string;
  lastName: string;
  avatarKey: string;
  email: string;
  phone: string;
  specializations: Specialization[];
  hospitals: Hospital[];
}
