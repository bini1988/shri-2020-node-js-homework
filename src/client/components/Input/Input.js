import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Input.scss';

const bn = cn('Input');

function Input(props) {
  const {
    className, id, name, type, value, palceholder, textAlign, cleanable, onChange,
  } = props;

  const handleChange = (event) => {
    onChange(event.target.value, event);
  };
  const handleClear = (event) => {
    onChange('', event);
  };

  return (
    <div className={classnames(className, bn({ textAlign, cleanable }))}>
      <input
        className={bn('Control')}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={palceholder}
        onChange={handleChange}
      />
      <button
        className={bn('Clear', { hidden: !value })}
        type="button"
        onClick={handleClear}
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
  value: PropTypes.string,
  palceholder: PropTypes.string,
  textAlign: PropTypes.string,
  cleanable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
