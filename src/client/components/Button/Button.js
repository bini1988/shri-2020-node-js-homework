import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Button.scss';

const bn = cn('Button');

function Button(props) {
  const {
    className, label, iconName, theme, size, view, adaptive, ...restProps
  } = props;
  const mods = {
    theme, size, view, adaptive,
  };

  return (
    <button
      type="button"
      {...restProps}
      className={classnames(className, bn(mods))}
    >
      <span className={bn('Wrapper')}>
        {!!iconName && (
          <svg className={bn('Icon')} width="12" height="12">
            <use xlinkHref={`#${iconName}`} />
          </svg>
        )}
        <span className={bn('Label')}>{label}</span>
      </span>
    </button>
  );
}

Button.defaultProps = {
  theme: 'normal',
};
Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  iconName: PropTypes.string,
  theme: PropTypes.string,
  size: PropTypes.string,
  view: PropTypes.string,
  adaptive: PropTypes.bool,
};

export default Button;
