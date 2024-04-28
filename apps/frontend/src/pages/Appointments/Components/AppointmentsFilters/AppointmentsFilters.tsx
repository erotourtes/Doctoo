import OptionalSelect from '@/components/UI/Select/OptionalSelect';
import type { FilterState, FilterAction } from '../../AppointmentsPage';

type AppointmentsFiltersProps = { state: FilterState; dispatch: React.Dispatch<FilterAction> };

export default function AppointmentsFilters({ state, dispatch }: AppointmentsFiltersProps) {
  const filterTypeToActionType: Record<string, FilterAction['type']> = {
    time: 'SET_TIME',
    statuses: 'SET_STATUSES',
    doctors: 'SET_DOCTORS',
    order: 'SET_ORDER',
  };

  function handleFilterChange(filterType: string, selectedOptions: string[]) {
    const actionType = filterTypeToActionType[filterType];

    if (actionType) {
      const payload = selectedOptions.length > 0 ? selectedOptions : [getDefaultOptionForFilterType(filterType)];
      dispatch({ type: actionType, payload });
    }
  }

  function getDefaultOptionForFilterType(filterType: string): string {
    switch (filterType) {
      case 'time':
        return 'All time';
      case 'statuses':
        return 'All statuses';
      case 'doctors':
        return 'All doctors';
      case 'order':
        return 'Latest to oldest';
      default:
        return '';
    }
  }
  function getOptionsForFilterType(filterType: string): { id: string; name: string }[] {
    switch (filterType) {
      case 'time':
        return ['All time', 'Last week', 'Last month'].map(option => ({ id: option, name: option }));
      case 'statuses':
        return ['All statuses', 'Last week', 'Last month'].map(option => ({ id: option, name: option }));
      case 'doctors':
        return ['All doctors', 'Last week', 'Last month'].map(option => ({ id: option, name: option }));
      case 'order':
        return ['Latest to oldest', 'Oldest to latest'].map(option => ({ id: option, name: option }));
      default:
        return [];
    }
  }

  function getDisplayValue(filterType: string): string {
    const selectedOptions = state[filterType as keyof FilterState];
    return selectedOptions.length > 1 ? 'Hover to view filters' : selectedOptions[0];
  }

  return (
    <div className='flex gap-x-4'>
      {Object.keys(filterTypeToActionType).map(filterType => (
        <OptionalSelect
          key={filterType}
          options={getOptionsForFilterType(filterType)}
          defaultOption={getDisplayValue(filterType)}
          setChosenOptions={selectedOptions => handleFilterChange(filterType, selectedOptions)}
        />
      ))}
    </div>
  );
}
