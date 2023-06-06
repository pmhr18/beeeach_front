import { ChangeEvent } from 'react';

export interface Option {
	id: number;
	name: string;
	checked: boolean;
}

interface CheckboxInputOptionProps {
	options: Option[];
	label: string;
  name: string;
	value: number[];
	checked: boolean[];
  // onChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CheckboxInputOption ({ label, name, options, onChange }: CheckboxInputOptionProps) {
  return (
    <div>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.id}>
          <input
            className='checkbox checkbox-primary'
            type='checkbox'
            name={name}
            value={option.id}
            checked={option.checked}
            onChange={onChange}
          />
          <label>{option.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxInputOption;