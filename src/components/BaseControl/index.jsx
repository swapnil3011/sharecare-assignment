import clsx from 'clsx';

import { useControlField } from '../../hooks/useControlField.jsx';

import controlStyles from './styles.module.scss';

const BaseControl = ({
  className,
  name,
  control,
  rules,
  label,
  trigger,
  renderControl,
}) => {
  const {
    field,
    isFocused,
    message,
    error,
    isTouched,
    isDirty,
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
        error && controlStyles.error,
        isFocused && controlStyles.focused,
        isTouched && controlStyles.touched,
        !invalid && controlStyles.valid
      )}
    >
      {message && <label className={controlStyles.label}>{message}</label>}
      {renderControl({
        field,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        isDirty,
        isTouched,
        isFocused,
        invalid,
        error,
      })}
    </div>
  );
};

export default BaseControl;
