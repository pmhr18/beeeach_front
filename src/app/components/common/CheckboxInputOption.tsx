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
      {/* <label>{label}</label> */}
      <h3 className='font-bold'>{label}</h3>
      {options.map((option) => (
        <div key={option.id} className='inline-block'>
          <input
            aria-label={option.name}
            className='btn btn-sm rounded-full m-1'
            type='checkbox'
            name={name}
            value={option.id}
            checked={option.checked}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxInputOption;