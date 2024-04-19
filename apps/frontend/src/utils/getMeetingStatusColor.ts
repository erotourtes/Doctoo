export const getMeetingStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-main';
    case 'planned':
      return 'bg-orange';
    case 'canceled':
      return 'bg-error';
    default:
      return 'bg-transparent';
  }
};
