import { useNavigate } from 'react-router-dom';
import type { IDoctor } from '@/dataTypes/Doctor';
import Icon from '@/components/UI/Icon/Icon';
import ShortInfoCard from '../ShortInfoCard/ShortInfoCard';

type AppointmentCardProps = {
  doctors: IDoctor[] | undefined;
};

export default function MyDoctorsCard({ doctors }: AppointmentCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`h-full min-h-[236px] w-full rounded-xl bg-white p-2 sm:p-6 lg:max-w-[302px] ${doctors && doctors?.length > 0 ? 'flex flex-col gap-6' : 'grid'} `}
      >
        <div className='flex flex-row items-center justify-between'>
          <h3 className='text-lg font-medium leading-6'>My doctors</h3>
          {doctors && doctors?.length > 0 && (
            <button
              className='flex h-fit w-fit items-center justify-center gap-1 rounded-2xl border-none bg-background px-1 py-1 text-text sm:px-4'
              onClick={() => navigate(`/my-doctors`)}
            >
              <p>{`View all (${doctors?.length})`}</p>
              <Icon variant={'arrow-right'} />
            </button>
          )}
        </div>
        {doctors && doctors?.length > 0 ? (
          <div className='flex flex-col'>
            {doctors
              ?.slice(0, 2)
              .map((doctor: IDoctor, key: number) => (
                <ShortInfoCard
                  fullName={`Dr. ${doctor.firstName + ' ' + doctor.lastName}`}
                  about={doctor.about}
                  avatarKey={doctor.avatarKey}
                  classNames='bg-background] w-full rounded-xl mb-[14px]'
                  key={key}
                />
              ))}
          </div>
        ) : (
          <p className='text-center font-normal leading-6 lg:px-4'>Your doctors will be displayed here</p>
        )}
      </aside>
    </>
  );
}
