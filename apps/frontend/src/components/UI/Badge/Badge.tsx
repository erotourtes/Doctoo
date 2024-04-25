type BadgeProps = { children: React.ReactNode; badgeColor: string; labelColor: string };

export default function Badge({ children = 'Label', badgeColor = 'main-light', labelColor = 'main' }: BadgeProps) {
  return (
    <div className={`my-4 flex h-fit w-fit items-center justify-center rounded-2xl bg-${badgeColor} px-3 py-1 pb-1`}>
      <span className={`select-none text-sm font-normal text-${labelColor}`}>{children}</span>
    </div>
  );
}
