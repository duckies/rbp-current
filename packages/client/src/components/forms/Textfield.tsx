import { useState } from "react";
import css from "styles/components/forms/textfield.module.scss";

export interface TextfieldProps {
  id: string | number;
  label: string;
}

export default function Textfield(props: TextfieldProps) {
  const [value, setValue] = useState<string>("");
  const id = `textfield-${props.id}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label className={css.label} htmlFor={id}>
        {props.label}
      </label>
      <div className={css.container}>
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleChange}
          className={css.input}
        />
      </div>
    </div>
  );
}
