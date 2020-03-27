import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';
import Input from '../Input';

function TextInput(props) {
  const { name, label } = props;

  return (
    <div className="TextInput TextInput_required">
      <label className="TextInput-Label" htmlFor={name}>
        {label}
      </label>
      <Input className="TextInput-Control" name={name} cleanable />
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
