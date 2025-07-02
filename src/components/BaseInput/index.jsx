import clsx from 'clsx';
import { useState } from 'react';
import { useController } from 'react-hook-form';

import controlStyles from '../BaseControlElement.module.scss';

import IconPencil from '../../assets/icon-pencil.jsx';
import IconTick from '../../assets/icon-tick.jsx';

function BaseInput({
  name,
  methods: { control, trigger },
  label,
  rules = {},
  type = 'text',
  disabled = false,
  className = '',
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState(label);

  const {
    field,
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });


  const { error, invalid, isTouched } = fieldState;

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

  const handleChange = (e) => {
    field.onChange(e);
  };

  return (
    <div
      className={clsx(
        className,
        controlStyles.wrapper,
        error && controlStyles['error'],
        isFocused && controlStyles['focused'],
        isTouched && controlStyles['touched'],
        !invalid && controlStyles['valid']
      )}
    >
      {message && (
        <label className={controlStyles.label}>
          {message}
        </label>
      )}

      <div className={controlStyles['input-icon-wrapper']}>
        <input
          type={type}
          disabled={disabled}
          {...field}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={controlStyles.input}
          {...rest}
        />

        {
          !isTouched || invalid || isFocused ? (
            <span className={controlStyles['icon-wrapper']}>
              <IconPencil color={(error && !isFocused && '#DE1E1E') || undefined} />
            </span>
          ) : (
            <span className={controlStyles['icon-wrapper']}>
              <IconTick />
            </span>
          )
        }
      </div>
    </div>
  );
}

export default BaseInput;