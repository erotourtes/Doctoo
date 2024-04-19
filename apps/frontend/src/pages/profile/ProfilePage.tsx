import PageHeader from '../PageHeader';
import StatsCard from './components/StatsCard/StatsCard';
import { useAppSelector } from '@/app/hooks';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import { capitalizeString } from '../../utils/capitalizeString';
import MedicalCondition from './components/MedicalCondition/MedicalCondition';
import AddressInfo from './components/AddressInfo/AddressInfo';
import PaymentMethods from './components/PaymentMethods/PaymentMethods';

const ProfilePage = () => {
  const patient = useAppSelector(state => state.patient.data);
  return (
    <div>
      <PageHeader iconVariant={'account'} title='Profile' />

      <section className='flex w-full flex-col gap-7 overflow-y-auto bg-background pt-7 lg:flex-row lg:gap-3 xl:gap-7'>
        <div className='flex w-full flex-col gap-7'>
          <PersonalInfo />

          <MedicalCondition />

          <PaymentMethods />

          <AddressInfo />
        </div>

        <div className='w-full   gap-7 lg:flex lg:max-w-[200px] lg:flex-col'>
          <StatsCard title='Height,cm' value={patient.height.toString()} iconVariant='height' />

          <StatsCard title='Weight,kg' value={patient.weight.toString()} iconVariant='weight' />

          {/*TODO: Add age icon when presen */}
          <StatsCard title='Age' value={patient.age.toString()} iconVariant='weight' />

          <StatsCard title='Blood type' value={patient.bloodType.toString()} iconVariant='blood-type' />

          <StatsCard title='Gender' value={capitalizeString(patient.gender)} iconVariant='gender' />
        </div>
      </section>
    </div>
  );
};
export default ProfilePage;
