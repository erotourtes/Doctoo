import type { RadioButtonProps } from './RadioButton';
import { RadioButton } from './RadioButton';

interface RadioButtonGroupProps {
  options: Omit<RadioButtonProps, 'name' | 'onClick' | 'selected'>[];
  className?: string;
  groupName: string;
  selected: string | null; // Add this line
  setSelected: (value: string | null) => void; // Add this line
}

export default function RadioButtonGroup({
  options,
  className,
  groupName,
  selected,
  setSelected,
}: RadioButtonGroupProps) {
  return (
    <fieldset className={className}>
      {options.map((option, index) => (
        <RadioButton
          key={`${groupName}-${index}`}
          label={option.label}
          name={groupName}
          selected={selected === option.value || selected === option.label}
          onClick={() => setSelected(option.value || option.label)}
        />
      ))}
    </fieldset>
  );
}
