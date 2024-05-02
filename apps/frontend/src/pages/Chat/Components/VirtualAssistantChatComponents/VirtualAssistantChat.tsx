import { Button, Icon } from '@/components/UI';

export function VirtualAssistantChat() {
  const messages: { role: string; text: string }[] = [];
  return (
    <div className='flex h-full flex-col rounded-b-xl rounded-r-xl bg-white'>
      <div className='flex w-full gap-3 p-8'>
        <div className='h-fit w-fit rounded-lg bg-main p-[10px]'>
          <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15.3999 3.23077C15.3999 1.44646 16.8464 0 18.6307 0H19.1691C20.9534 0 22.3999 1.44647 22.3999 3.23077V12.6H15.3999V3.23077Z'
              fill='#FFC249'
            />
            <path
              d='M24.769 5.59961C26.5533 5.59961 27.9998 7.04607 27.9998 8.83038L27.9998 9.36884C27.9998 11.1531 26.5533 12.5996 24.769 12.5996L15.3998 12.5996L15.3998 5.59961L24.769 5.59961Z'
              fill='#FFC249'
            />
            <rect width='7' height='12.6' transform='matrix(1 0 0 -1 15.3999 28)' fill='white' />
            <rect
              width='7'
              height='12.6'
              transform='matrix(-4.37114e-08 -1 -1 4.37114e-08 27.9998 22.4004)'
              fill='white'
            />
            <rect width='7' height='12.6' transform='matrix(-1 0 0 1 12.6001 0)' fill='white' />
            <rect
              width='7'
              height='12.6'
              transform='matrix(4.37114e-08 1 1 -4.37114e-08 0.000244141 5.59961)'
              fill='white'
            />
            <rect x='12.6001' y='28' width='7' height='12.6' transform='rotate(180 12.6001 28)' fill='white' />
            <rect
              x='0.000244141'
              y='22.4004'
              width='7'
              height='12.6'
              transform='rotate(-90 0.000244141 22.4004)'
              fill='white'
            />
          </svg>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='text-lg font-semibold text-black'>Your virtual assistant</div>
          <div className='font-medium text-grey-1'>Online</div>
        </div>
      </div>
      <div className='mx-2 flex h-full flex-col gap-3 bg-background p-4'>
        {/* <div className='mx-auto font-medium text-grey-2'>4 September</div> */}
        <div className='flex flex-col gap-2'>
          {messages.length !== 0 ? (
            messages.map((message, index) => (
              <div key={index} className='w-fit max-w-[50%] bg-white p-5 text-black'>
                {message.text}
              </div>
            ))
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <p className='italic'>No messages here yet.</p>
            </div>
          )}

          {/* <div className='text-xs font-medium text-grey-2'>5:22pm</div> */}
        </div>
        <div></div>
      </div>
      <div>
        <div className='flex w-full items-center justify-between bg-white p-8'>
          <div className='flex w-full gap-2 text-grey-2'>
            <Icon variant='attach' />
            <textarea rows={1} placeholder='Write a message...' className='w-full resize-none outline-none' />
          </div>
          <Button type='primary' className='w-fit min-w-[none] cursor-pointer rounded-lg bg-main p-2'>
            <Icon className='text-white' variant='send-message' />
          </Button>
        </div>
      </div>
    </div>
  );
}
