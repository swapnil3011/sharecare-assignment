import { useController } from 'react-hook-form';
import {
  useState,
  useCallback,
  useEffect,
} from 'react';

export function useControlField({ name, control, rules = {}, label, trigger }) {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState(label);
  const [forceError, setForceError] = useState(false);

  const {
    field,
    fieldState: {
      error,
      invalid,
      isTouched,
      isDirty,
    },
    formState: { isSubmitting },
  } = useController({ name, control, rules });


  useEffect(() => {
    setTimeout(() => {
      if (isSubmitting) {
        setForceError(true);
      }
    });
  }, [isSubmitting]);

  useEffect(() => {
    if (error && (forceError || !isFocused)) {
      setMessage(error?.message);
    } else if (error && isFocused) {
      setMessage(label);
    }
  }, [error, forceError]);

  const handleFocus = useCallback(() => {
    setForceError(false);
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
    setForceError(false);
    field.onChange(e);
  }, [field]);

  return {
    field,
    isFocused,
    message,
    error,
    isTouched,
    isDirty,
    invalid,
    forceError,
    handleFocus,
    handleBlur,
    handleChange,
  };
}
