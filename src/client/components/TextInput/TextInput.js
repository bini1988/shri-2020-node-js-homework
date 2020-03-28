import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './TextInput.scss';
import Input from '../Input';

const bn = cn('TextInput');

function TextInput(props) {
  const {
    className, name, label, palceholder, required,
  } = props;

  return (
    <div className={classnames(className, bn({ required }))}>
      {!!label && (
        <label className={bn('Label')} htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        className={bn('Control')}
        name={name}
        palceholder={palceholder}
        cleanable
      />
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  palceholder: PropTypes.string,
  required: PropTypes.bool,
};

export default TextInput;
