import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Input.scss';

const bn = cn('Input');

function Input(props) {
  const {
    className,
    id,
    name,
    type,
    value,
    palceholder,
    min,
    max,
    textAlign,
    cleanable,
    innerRef,
    onChange,
  } = props;

  return (
    <div className={classnames(className, bn({ textAlign, cleanable }))}>
      <input
        ref={innerRef}
        className={bn('Control')}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={palceholder}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        className={bn('Clear', { hidden: !value })}
        type="button"
        onClick={() => onChange('')}
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
  onChange: () => {},
};
Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  palceholder: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  textAlign: PropTypes.string,
  cleanable: PropTypes.bool,
  innerRef: PropTypes.any,
  onChange: PropTypes.func,
};

export default Input;
