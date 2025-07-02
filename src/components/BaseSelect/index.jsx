import controlStyles from '../BaseControl/styles.module.scss';
import BaseControl from '../BaseControl';

const BaseSelect = ({
  className,
  label,
  name,
  methods: { control, trigger },
  rules = {},
  options = [],
  placeholder = 'Select an option',
  ...rest
}) => {
  const renderControl = ({ field, onFocus, onBlur, isDirty, isFocused, error }) => (
    <>
      <select
        {...field}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          field.onChange(e);
        }}
        className={controlStyles.input}
        {...rest}
      >
        <option value="" disabled hidden>
          {!isDirty && (isFocused || error) ? placeholder : ''}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  )

  return (
    <>
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
    </>
  );
};

export default BaseSelect;
