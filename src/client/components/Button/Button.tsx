import React, { FC, MouseEvent } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './Button.scss';

const bn = cn('Button');

export interface IButtonProps {
  className?: string;
  label?: string;
  iconName?: string;
  type?: 'button' | 'submit';
  theme?: 'action' | 'secondary';
  size?: 's';
  view?: 'tile';
  adaptive?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = (props) => {
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
  type: 'button',
};

export default Button;
