import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './NumericInput.scss';
import Input from '../Input';

const bn = cn('NumericInput');

function NumericInput(props) {
  const {
    className, id, name, label, value, min, max, palceholder, units, onChange,
  } = props;

  return (
    <div className={classnames(className, bn())}>
      <div className={bn('Wrapper')}>
        {!!label && (
          <label className={bn('Label')} htmlFor={id}>
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
          palceholder={palceholder}
          type="text"
          min={min}
          max={max}
          textAlign="right"
          onChange={onChange}
          render={(ref, forwardProps) => (
            <Input innerRef={ref} {...forwardProps} />
          )}
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  units: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default NumericInput;
