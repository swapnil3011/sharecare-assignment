import clsx from 'clsx';

import controlStyles from '../BaseControlElement.module.scss';

import IconPencil from '../../assets/icon-pencil.jsx';
import IconTick from '../../assets/icon-tick.jsx';
import { useControlField } from '../../hooks/useControlField.jsx';

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
  const {
    field,
    isFocused,
    message,
    error,
    isTouched,
    invalid,
    handleFocus,
    handleBlur,
    handleChange,
  } = useControlField({ name, control, rules, label, trigger });

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