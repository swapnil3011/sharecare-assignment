import controlStyles from '../BaseControl/styles.module.scss';

import IconPencil from '../../assets/icon-pencil.jsx';
import IconTick from '../../assets/icon-tick.jsx';

import BaseControl from '../BaseControl';

function BaseInput({
  name,
  methods: { control, trigger },
  label,
  rules = {},
  type = 'text',
  disabled = false,
  className = '',
  placeholder,
  ...rest
}) {
  const renderControl = ({
    field,
    onFocus,
    onBlur,
    onChange,
    isDirty,
    isTouched,
    isFocused,
    invalid,
    error,
    forceError,
  }) => (
    <div className={controlStyles['input-icon-wrapper']}>
      <input
        placeholder={!isDirty && (isFocused || error) ? placeholder : ''}
        type={type}
        {...field}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className={controlStyles.input}
        {...rest}
      />

      {
        !isTouched || invalid || isFocused ? (
          <span className={controlStyles['icon-wrapper']}>
            <IconPencil color={((error && (forceError || !isFocused)) && '#DE1E1E') || undefined} />
          </span>
        ) : (
          <span className={controlStyles['icon-wrapper']}>
            <IconTick />
          </span>
        )
      }
    </div>
  )

  return (
    <BaseControl
      className={className}
      name={name}
      label={label}
      control={control}
      trigger={trigger}
      methods={{ control, trigger }}
      rules = {rules}
      renderControl={renderControl}
    />
  );
}

export default BaseInput;