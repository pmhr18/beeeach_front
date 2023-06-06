import { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
	placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput ({ label, name, value, placeholder, onChange }:TextInputProps ) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
				id={name}
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
    </div>
  );
};

export default TextInput;