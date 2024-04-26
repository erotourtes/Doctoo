import { PopupDoctoo, Button, Tag } from '@/components/UI';
import { useEffect, useState } from 'react';

type MedicalConditionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MedicalConditionPopup = ({ isOpen, onClose }: MedicalConditionPopupProps) => {
  type Condtion = {
    id: string;
    name: string;
  };

  const conditions: Condtion[] = [
    {
      id: '1',
      name: 'Diabetes',
    },
    {
      id: '2',
      name: 'Diarehia',
    },
    {
      id: '3',
      name: 'Hypertension',
    },
  ];

  type Allergy = {
    id: string;
    name: string;
  };

  const allergies: Allergy[] = [
    {
      id: '1',
      name: 'Peanuts',
    },
    {
      id: '2',
      name: 'Lactose',
    },
    {
      id: '3',
      name: 'Gluten',
    },
  ];

  const [allConditions, setAllcondtions] = useState<Condtion[]>(conditions);

  const [suggestedCondtions, setSuggestedConditions] = useState<Condtion[]>([]);

  const [selectedCondtions, setSelectedConditions] = useState<Condtion[]>([]);

  const [allAllergies, setAllAllergies] = useState<Allergy[]>(allergies);

  const [suggestedAllergies, setSuggestedAllergies] = useState<Allergy[]>([]);

  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

  useEffect(() => {
    setAllcondtions(conditions);
    setAllAllergies(allergies);
  }, []);
  return (
    <PopupDoctoo
      popupIsOpen={isOpen}
      closePopup={onClose}
      modalBodyClassName='relative z-20 flex h-full min-w-[600px] flex-col gap-7 rounded-xl bg-white'
    >
      <p className='text-2xl font-medium text-black'>Medical condition and allergies </p>
      <form onSubmit={e => e.preventDefault()} className='flex w-full flex-col gap-7'>
        <div className='w-full'>
          <div>
            <label htmlFor='condtion' className='text-md mb-2 block text-grey-1'>
              Medical condition
            </label>
            <div className='box-border flex w-full flex-wrap rounded-lg bg-background pl-2 text-base text-text focus:outline-none'>
              {selectedCondtions.map(condition => (
                <Tag
                  key={condition.id}
                  icon
                  text={condition.name}
                  className='my-2 ml-1'
                  onClick={() => {
                    setSelectedConditions(prev => prev.filter(c => c.id !== condition.id));
                    setAllcondtions(prev => [...prev, condition]);
                  }}
                />
              ))}
              <input
                onChange={e => {
                  const value = e.target.value;

                  if (!value) return setSuggestedConditions([]);

                  allConditions.map(condition => {
                    if (suggestedCondtions.some(c => c.name === condition.name)) {
                      return;
                    }

                    if (condition.name.toLowerCase().startsWith(value.toLowerCase()) && value.length > 0) {
                      setSuggestedConditions(prev => [...prev, condition]);
                    }
                  });
                }}
                id='condition'
                className='w-max grow bg-transparent px-4 py-2 outline-none'
              />
            </div>
            {suggestedCondtions.map(condition => (
              <Tag
                icon={false}
                key={condition.id}
                text={condition.name}
                className='my-2 ml-1'
                onClick={() => {
                  setSelectedConditions(prev => [...prev, condition]);
                  setAllcondtions(prev => prev.filter(c => c.id !== condition.id));
                  setSuggestedConditions([]);
                }}
              />
            ))}
          </div>

          <div>
            <label htmlFor='allergies' className='text-md mb-2 block text-grey-1'>
              Allergies
            </label>
            <div className='box-border flex w-full flex-wrap rounded-lg bg-background pl-2 text-base text-text focus:outline-none'>
              {selectedAllergies.map(allergy => (
                <Tag
                  key={allergy.id}
                  icon
                  text={allergy.name}
                  className='my-2 ml-1'
                  onClick={() => {
                    setSelectedAllergies(prev => prev.filter(c => c.id !== allergy.id));
                    setAllAllergies(prev => [...prev, allergy]);
                  }}
                />
              ))}
              <input
                onChange={e => {
                  const value = e.target.value;

                  if (!value) return setSuggestedAllergies([]);

                  allAllergies.map(allergy => {
                    if (suggestedAllergies.some(a => a.name === allergy.name)) {
                      return;
                    }

                    if (allergy.name.toLowerCase().startsWith(value.toLowerCase()) && value.length > 0) {
                      setSuggestedAllergies(prev => [...prev, allergy]);
                    }
                  });
                }}
                id='conditallergiesion'
                className='w-max grow bg-transparent px-4 py-2 outline-none'
              />
            </div>
            {suggestedAllergies.map(allergy => (
              <Tag
                icon={false}
                key={allergy.id}
                text={allergy.name}
                className='my-2 ml-1'
                onClick={() => {
                  setSelectedAllergies(prev => [...prev, allergy]);
                  setAllAllergies(prev => prev.filter(c => c.id !== allergy.id));
                  setSuggestedAllergies([]);
                }}
              />
            ))}
          </div>
        </div>
        <div className='flex w-full gap-4'>
          <Button
            type='secondary'
            onClick={() => {
              setSelectedConditions([]);
              setSuggestedConditions([]);
            }}
            className='w-1/2'
          >
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={() => {
              if (selectedCondtions.length === 0) {
                return;
              }
              if (selectedAllergies.length === 0) {
                return;
              }
              //TODO: add fetch when PR is accepted
              console.log('Sent data:', selectedCondtions, selectedAllergies);
            }}
            className='w-1/2'
          >
            Save
          </Button>
        </div>
      </form>
    </PopupDoctoo>
  );
};

export default MedicalConditionPopup;
