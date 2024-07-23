import { ChangeEvent } from 'react';

interface TextInputProps {
  className: string;
  label: string;
  name: string;
  value: string;
	placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput ({ className, label, name, value, placeholder, onChange }:TextInputProps ) {
  return (
    <div>
      <h3>{label}</h3>
      <input
        className={className}
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
