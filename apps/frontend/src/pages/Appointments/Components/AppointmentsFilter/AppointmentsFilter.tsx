import Icon from '@/components/UI/Icon/Icon';
import type { AppointmentStatus } from '@/dataTypes/Appointment';
import { useState } from 'react';

type AppointmentsFilterProps = { state: FilterState; dispatch: React.Dispatch<FilterAction> };

type FilterButtonProps = { filterType: string; options: string[] };

export type Order = 'Latest to oldest' | 'Oldest to latest';

export type FilterState = {
  statuses: 'All statuses' | AppointmentStatus;
  time: string;
  doctors: string;
  order: Order;
};

export type FilterAction = {
  type: 'SET_TIME' | 'SET_STATUSES' | 'SET_DOCTORS' | 'SET_ORDER';
  payload: string | Order | AppointmentStatus;
};

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'SET_STATUSES':
      return { ...state, statuses: action.payload as AppointmentStatus };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'SET_ORDER':
      return { ...state, order: action.payload as Order };
    default:
      return state;
  }
}

const filterTypeToActionType: Record<string, FilterAction['type']> = {
  time: 'SET_TIME',
  statuses: 'SET_STATUSES',
  doctors: 'SET_DOCTORS',
  order: 'SET_ORDER',
};

export default function AppointmentsFilter({ state, dispatch }: AppointmentsFilterProps) {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    time: false,
    statuses: false,
    doctors: false,
    order: false,
  });

  function toggleFilter(filterType: string) {
    setOpenFilters(prevState => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));
  }

  function FilterButton({ filterType, options }: FilterButtonProps) {
    function handleFilterChange(option: string) {
      const actionType = filterTypeToActionType[filterType];

      if (actionType) {
        dispatch({ type: actionType, payload: option });
        toggleFilter(filterType);
      }
    }

    return (
      <div className='relative'>
        <button
          onClick={() => toggleFilter(filterType)}
          className={`flex h-8 max-w-44 items-start justify-between ${openFilters[filterType] ? 'rounded-t-2xl' : 'rounded-2xl'}  bg-white px-4 py-1`}
        >
          {state[filterType as keyof FilterState]}
          <Icon
            variant={`shevron-mini-${openFilters[filterType] ? 'open' : 'closed'}`}
            className='h-6 w-6 text-grey-3'
          />
        </button>
        {openFilters[filterType] && (
          <div
            style={{ position: 'absolute', zIndex: 1, width: '100%' }}
            className='flex flex-col items-start bg-white p-1'
          >
            {options.map(option => (
              <button
                key={option}
                className='w-full p-1 pl-3 text-left hover:bg-grey-5'
                onClick={() => handleFilterChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='flex gap-x-4'>
      <FilterButton filterType='time' options={['All time', 'Last week', 'Last month']} />
      <FilterButton filterType='statuses' options={['All time', 'Last week', 'Last month']} />
      <FilterButton filterType='doctors' options={['All time', 'Last week', 'Last month']} />
      <FilterButton filterType='order' options={['All time', 'Last week', 'Last month']} />
    </div>
  );
}
