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
      <div className={`${classNames} flex flex-row px-[16px] py-[8px]`}>
        <img src={avatarKey} alt={avatarKey} width='48px' height='48px' className='rounded-lg' />
        <div className='ml-[8px] flex w-[197px] min-w-[197px] flex-col'>
          <p className='font-semibold leading-6'>{fullName}</p>
          <div className='flex w-full'>
            <p className='text-sm font-medium leading-5 text-[#707D7E]'>{about}</p>
            {eventTime ? (
              <p className='ml-auto mr-0 text-sm font-medium leading-5 text-[#707D7E]'>{eventTime}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
