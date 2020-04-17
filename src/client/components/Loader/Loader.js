import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Loader.scss';

const bn = cn('Loader');

function Loader({ className }) {
  return (
    <div className={classnames(className, bn())} />
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
