type PopupHeaderProps = {
  headerClassName: string;
  children: React.ReactNode;
};

export default function PopupHeader({ headerClassName, children }: PopupHeaderProps) {
  return <div className={headerClassName}>{children}</div>;
}
