import { useAppSelector } from '@/app/hooks';
import type { IChat, IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';

type ChatHeaderProps = {
  chat: IChat;
};

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const user = useAppSelector(state => state.user.data);
  let participant: IChatDoctor | IChatPatient = chat.doctor;
  if (user.role === Role.DOCTOR) {
    participant = chat?.patient;
  }

  return (
    <div className='flex flex-shrink-0 items-center gap-2 p-5'>
      <div className='avatar size-12 overflow-hidden rounded-lg bg-main'>
        <img src={participant.avatar.url} alt={participant.avatar.name} />
      </div>
      <div className='grid flex-1 gap-1'>
        <div className='text-lg font-bold text-black'>{`${participant.firstName} ${participant.lastName}`}</div>
        {participant && 'specializationName' in participant && participant.specializationName ? (
          <div className='truncate text-base font-normal text-black-2'>{chat.doctor.specializationName}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatHeader;
