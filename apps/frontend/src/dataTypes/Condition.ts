// import type { paths } from '@/api';

// export type TCondition = paths['/condition/{id}']['get']['responses']['200']['content']['application/json'];

export type TCondition = {
  id: string;
  name: string;
};