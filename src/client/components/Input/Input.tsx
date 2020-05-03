import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Input.scss';

const bn = cn('Input');

type InputPropsKeys = 'id' | 'name' | 'type' | 'value' | 'defaultValue' | 'placeholder' | 'min' | 'max';

export interface IInputProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, InputPropsKeys> {
  className?: string;
  textAlign?: 'right';
  cleanable?: boolean;
  innerRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Input: FC<IInputProps> = (props) => {
  const {
    className,
    id,
    name,
    type,
    value,
    defaultValue,
    placeholder,
    min,
    max,
    textAlign,
    cleanable,
    innerRef,
    onChange,
    onClear,
  } = props;

  return (
    <div className={classnames(className, bn({ textAlign, cleanable }))}>
      <input
        ref={innerRef}
        className={bn('Control')}
        data-test="input"
        type={type}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={onChange}
      />
      <button
        className={bn('Clear', { hidden: !value })}
        data-test="clear"
        type="button"
        onClick={onClear}
      >
        <svg className={bn('Icon')} width="16" height="16">
          <use xlinkHref="#clear" />
        </svg>
        Clear
      </button>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
};

export default Input;
