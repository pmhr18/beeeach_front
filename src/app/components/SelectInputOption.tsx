import { ChangeEvent } from 'react';

interface Option {
  id: number;
  name: string;
}

interface SelectInputOptionProps {
  label: string;
  name: string;
  value: number;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInputOption ({ label, name, value, options, onChange }:SelectInputOptionProps ) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        className='select select-warning w-full max-w-xs'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option disabled selected value={0}>選択してください</option>
        {options.map((option, i) => (
          <option key={i} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputOption;

