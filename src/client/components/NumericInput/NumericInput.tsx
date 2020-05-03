import React, { FC, useCallback } from 'react';
import MaskedInput from 'react-text-mask';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './NumericInput.scss';
import Input from '../Input';
import { IInputProps } from '../Input/Input';

const bn = cn('NumericInput');

export interface INumericInputProps extends Omit<IInputProps, 'onChange'> {
  className?: string;
  label?: string;
  units?: string;
  onChange?: (value?: string) => void;
}

const NumericInput: FC<INumericInputProps> = (props) => {
  const {
    className,
    id,
    name,
    label,
    value,
    min,
    max,
    placeholder,
    units,
    onChange = () => {},
  } = props;

  const handleChange =
    useCallback((event) => onChange(event.target.value), [onChange]);

  return (
    <div className={classnames(className, bn())}>
      <div className={bn('Wrapper')}>
        {!!label && (
          <label
            className={bn('Label')}
            data-test="label"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <MaskedInput
          mask={[/\d/, /\d/, /\d/]}
          guide={false}
          className={bn('Control')}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          type="text"
          min={min}
          max={max}
          onChange={handleChange}
          render={(ref, forwardProps) => (
            <Input {...forwardProps}
              innerRef={ref}
              textAlign="right"
            />
          )}
        />
        <span className={bn('Units')} data-test="units">
          {units}
        </span>
      </div>
    </div>
  );
}

export default NumericInput;
