import clsx from 'clsx';

import controlStyles from '../BaseControlElement.module.scss';
import { useControlField } from '../../hooks/useControlField';

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
  const {
    field,
    isFocused,
    message,
    error,
    isTouched,
    invalid,
    handleFocus,
    handleBlur,
  } = useControlField({ name, control, rules, label, trigger });

  return (
    <div
      className={clsx(
        className,
        controlStyles.wrapper,
        error && controlStyles.error,
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
