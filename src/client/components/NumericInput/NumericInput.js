import React from 'react';
import PropTypes from 'prop-types';
import './NumericInput.scss';
import Input from '../Input';

function NumericInput(props) {
  const {
    id, name, label, units,
  } = props;

  return (
    <div className="NumericInput">
      <div className="NumericInput-Wrapper">
        <label className="NumericInput-Label" htmFor={id}>
          {label}
        </label>
        <Input
          className="NumericInput-Control"
          id={id}
          name={name}
          type="number"
          min="0"
          max="1000"
          textAlign="right"
          cleanable
        />
        <span className="NumericInput-Units">{units}</span>
      </div>
    </div>
  );
}

NumericInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

export default NumericInput;
