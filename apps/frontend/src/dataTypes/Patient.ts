import type { paths } from '@/api';

export type BloodType = paths['/patient/{id}']['get']['responses']['200']['content']['application/json']['bloodType'];

export type Gender = paths['/patient/{id}']['get']['responses']['200']['content']['application/json']['gender'];

export type TPatient = paths['/patient/{id}']['get']['responses']['200']['content']['application/json'];

export type Vaccination = {
  id: string;
  name: string;
};
