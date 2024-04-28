import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/UI/Icon/Icon';
import type { IDoctor } from '@/dataTypes/Doctor';
import DoctorCard from '../DoctorCard/DoctorCard';
import { useNavigate } from 'react-router-dom';

type AppointmentCardProps = {
  doctors: IDoctor[] | undefined;
};

export default function MyDoctorsCard({ doctors }: AppointmentCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <aside className='m-w-[302px] mt-[24px] h-[236px] min-h-[236px] w-[302px] rounded-xl bg-[#ffffff] p-[24px]'>
        <div className={`flex flex-row ${doctors && doctors?.length > 0 ? 'mb-[24px]' : 'pb-0'}`}>
          <h3 className='text-lg font-medium leading-6'>My doctors</h3>
          {doctors && doctors?.length > 0 ? (
            <Button
              className='ml-auto mr-0  h-[28px]  rounded-2xl border-none bg-[#F1F6F9] px-[18px] text-[#454F50]'
              type={'secondary'}
              onClick={() => navigate(`/my-doctors`)}
            >
              <div className='flex flex-row text-sm font-normal'>
                <p>{`View all (${doctors?.length})`}</p> <Icon variant={'arrow-right'} />
              </div>
            </Button>
          ) : (
            <></>
          )}
        </div>
        {doctors && doctors?.length > 0 ? (
          <div className='flex flex-col'>
            {doctors
              ?.slice(0, 2)
              .map((doctor: IDoctor, key: number) => (
                <DoctorCard doctor={doctor} classNames='bg-[#f1f6f9] w-full rounded-xl mb-[14px]' key={key} />
              ))}
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <p className='font-normal leading-6'>Your doctors will be</p>
            <p className='font-normal leading-6'>displayed here</p>
          </div>
        )}
      </aside>
    </>
  );
}
