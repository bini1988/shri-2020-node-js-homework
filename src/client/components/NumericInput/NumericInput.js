import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './NumericInput.scss';
import Input from '../Input';

const bn = cn('NumericInput');

function NumericInput(props) {
  const {
    className, id, name, label, palceholder, units,
  } = props;

  return (
    <div className={classnames(className, bn())}>
      <div className={bn('Wrapper')}>
        {!!label && (
          <label className={bn('Label')} htmlFor={id}>
            {label}
          </label>
        )}
        <Input
          className={bn('Control')}
          id={id}
          name={name}
          palceholder={palceholder}
          type="number"
          min="0"
          max="1000"
          textAlign="right"
        />
        <span className={bn('Units')}>{units}</span>
      </div>
    </div>
  );
}

NumericInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  units: PropTypes.string.isRequired,
};

export default NumericInput;
