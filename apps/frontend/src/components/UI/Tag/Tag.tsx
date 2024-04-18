interface TagProps{
  icon: boolean
  text: string
}

const Tag = ({icon, text}: TagProps) => {
  return (
    <div className="leading-5 pointer px-3 py-1 bg-main-light text-main-dark font-normal text-sm inline-flex rounded-full gap-1 items-center" >
      {text} {icon && <span className='bg-white rounded-xl w-6 h-6 inline-flex items-center justify-center'>
      <svg className='' width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                              xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.162718 0.162718C0.379676 -0.0542395 0.731435 -0.0542395 0.948393 0.162718L5 4.21433L9.05161 0.162718C9.26856 -0.0542395 9.62032 -0.0542395
                9.83728 0.162718C10.0542 0.379676 10.0542 0.731435 9.83728 0.948393L5.78567 5L9.83728 9.05161C10.0542 9.26856 10.0542 9.62032 9.83728 9.83728C9.62032 10.0542
                9.26856 10.0542 9.05161 9.83728L5 5.78567L0.948393 9.83728C0.731435 10.0542 0.379676 10.0542 0.162718 9.83728C-0.0542395 9.62032 -0.0542395 9.26856 0.162718
                 9.05161L4.21433 5L0.162718 0.948393C-0.0542395 0.731435 -0.0542395 0.379676 0.162718 0.162718Z"
                fill="#AFBCBD" />
          </svg>
          </span>}
    </div>
  );
};

export default Tag;