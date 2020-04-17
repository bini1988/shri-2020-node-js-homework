import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './TextInput.scss';
import Input from '../Input';

const bn = cn('TextInput');

function TextInput(props) {
  const {
    className, id, name, label, value, palceholder, required, onChange, ...restProps
  } = props;

  return (
    <div className={classnames(className, bn({ required }))} {...restProps}>
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
        palceholder={palceholder}
        cleanable
        onChange={onChange}
      />
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  palceholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextInput;
