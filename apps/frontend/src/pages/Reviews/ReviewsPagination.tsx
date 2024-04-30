import { Button } from '@/components/UI';

type ReviewsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ReviewsPagination({ currentPage, totalPages, onPageChange }: ReviewsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='my-2 flex gap-x-6'>
      {pages.map(page => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          type={`${page === currentPage ? 'primary' : 'secondary'}`}
        >
          {page}
        </Button>
      ))}
    </div>
  );
}
