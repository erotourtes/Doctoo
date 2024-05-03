import { Icon } from '../../../components/UI';

export const NoResults = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute left-1/2 top-1/2 max-w-[345px] -translate-x-1/2 translate-y-1/2 text-center'>
        <div className='inline-block h-[70px] w-[70px] rounded-full bg-main-light p-4'>
          <Icon variant='search' className='size-10 text-white' />
        </div>
        <h1 className='mt-2 text-center text-2xl font-medium'>No results found</h1>
        <p className='mt-2 text-center text-base font-normal'>
          Try adjusting your search or filter to find what you&lsquo;re looking for
        </p>
      </div>
    </div>
  );
};
