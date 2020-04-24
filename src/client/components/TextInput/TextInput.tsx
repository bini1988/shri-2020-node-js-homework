import React, { FC, ChangeEvent, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './TextInput.scss';
import Input from '../Input';
import { IInputProps } from '../Input/Input';

const bn = cn('TextInput');

export interface ITextInputProps extends Omit<IInputProps, 'onChange'> {
  className?: string;
  label?: string;
  units?: string;
  required?: boolean;
  onChange?: (value?: string) => void;
}

const TextInput: FC<ITextInputProps> =(props) => {
  const {
    className,
    id,
    name,
    label,
    value = '',
    placeholder,
    required,
    onChange = () => {},
  } = props;

  const handleChange = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);
  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={classnames(className, bn({ required }))}>
      {!!label && (
        <label
          className={bn('Label')}
          data-test="label"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Input
        className={bn('Control')}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        cleanable
        onChange={handleChange}
        onClear={handleClear}
      />
    </div>
  );
}

export default TextInput;
