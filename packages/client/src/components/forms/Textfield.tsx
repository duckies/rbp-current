import { useState } from 'react';

export interface TextfieldProps {
  id: string | number
  label: string
}

export default function Textfield(props: TextfieldProps) {
  const [value, setValue] = useState<string>('');
  const id = `textfield-${props.id}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label className="block font-medium text-sm" htmlFor={id}>
        {props.label}
      </label>
      <div className="relative mt-1">
        <input
          className="block w-full px-3 py-2 focus:border-pink outline-pink outline-offset2"
          type="text"
          id={id}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
