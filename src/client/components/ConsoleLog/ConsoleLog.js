/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import Convert from 'ansi-to-html';
import './ConsoleLog.scss';

const bn = cn('ConsoleLog');
const convert = new Convert({ fg: '#000', bg: '#000' });

function ConsoleLog(props) {
  const { className, children } = props;
  const html = children ? convert.toHtml(children) : null;

  return (
    <div
      className={classnames(className, bn())}
      data-test="console-log"
    >
      <pre className={bn('Wrappper')} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

ConsoleLog.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

export default ConsoleLog;
