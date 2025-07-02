import { useController } from 'react-hook-form';
import { useState, useCallback } from 'react';

export function useControlField({ name, control, rules = {}, label, trigger }) {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState(label);

  const {
    field,
    fieldState: { error, invalid, isTouched },
  } = useController({ name, control, rules });

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    trigger?.(name);
    setMessage(label);
  }, [trigger, name, label]);

  const handleBlur = useCallback(() => {
    field.onBlur();
    setIsFocused(false);
    setMessage(invalid ? error?.message || label : '');
  }, [field, error, invalid, label]);

  const handleChange = useCallback((e) => {
    field.onChange(e);
  }, [field]);

  return {
    field,
    isFocused,
    message,
    error,
    isTouched,
    invalid,
    handleFocus,
    handleBlur,
    handleChange,
  };
}
