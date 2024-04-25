import { BloodType, Gender } from '@prisma/client';

export const patientStub = () => {
  return {
    userId: 'cd0e1042-1ff3-4edd-971d-42aaaa479c90',
    weight: 70,
    height: 180,
    age: 30,
    identityCardKey: 'identity_card_key_here',
    bloodType: BloodType,
    gender: Gender,
    country: 'Country Name',
    state: 'State Name',
    city: 'City Name',
    street: 'Street Address',
    apartment: 'Apartment Number',
    zipCode: 12345,
  };
};
