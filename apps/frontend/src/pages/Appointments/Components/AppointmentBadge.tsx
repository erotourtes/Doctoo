type AppointmentBadgeProps = { label: string; labelColor: string; badgeColor: string };

export default function AppointmentBadge({ label, labelColor, badgeColor }: AppointmentBadgeProps) {
  return (
    <div className={`my-4 flex h-fit w-fit items-center justify-center rounded-2xl bg-${badgeColor} px-3 py-1 pb-1`}>
      <span className={`select-none text-sm font-normal text-${labelColor}`}>{label}</span>
    </div>
  );
}
