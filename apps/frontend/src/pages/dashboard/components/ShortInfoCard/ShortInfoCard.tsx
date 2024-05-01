type AppointmentCardProps = {
  fullName: string;
  avatarKey: string;
  about: string;
  eventTime?: string;
  classNames: string | undefined;
};

export default function ShortInfoCard({ fullName, avatarKey, about, eventTime, classNames }: AppointmentCardProps) {
  return (
    <>
      <div className={`${classNames} flex w-full max-w-[261px] flex-row items-center gap-4`}>
        <img src={avatarKey} alt={avatarKey} className='h-8 w-8 rounded-lg md:h-12 md:w-12' />
        <div className='flex w-full max-w-[150px] flex-col'>
          <p className='font-semibold leading-6'>{fullName}</p>
          <div className='flex w-full'>
            <p className='text-sm font-medium leading-5 text-grey-1'>{about}</p>
            {eventTime ? <p className='ml-auto mr-0 text-sm font-medium leading-5 text-grey-1'>{eventTime}</p> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
