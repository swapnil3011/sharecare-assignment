import { useState } from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

import controlStyles from '../BaseControlElement.module.scss';

const BaseSelect = ({
  className,
  label,
  name,
  methods: { control, trigger },
  rules = {},
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState(label);

  const {
    field,
    fieldState: { error, isTouched, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  const handleFocus = () => {
    setIsFocused(true);
    trigger(name);
    setMessage(label);
  };

  const handleBlur = () => {
    field.onBlur();
    setIsFocused(false);

    if (invalid) {
      setMessage(error?.message || label);
    } else {
      setMessage('')
    }
  };

  const isError = invalid;

  return (
    <div
      className={clsx(
        className,
        controlStyles.wrapper,
        isError && controlStyles.error,
        isFocused && controlStyles.focused,
        isTouched && controlStyles.touched,
        !invalid && controlStyles.valid
      )}
    >
      {label && (
        <label className={controlStyles.label}>
          {message}
        </label>
      )}

      <select
        {...field}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          field.onChange(e);
        }}
        disabled={disabled}
        className={controlStyles.input}
        {...rest}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseSelect;
