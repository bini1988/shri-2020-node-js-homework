/* eslint-disable react/no-danger */
import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import Convert from 'ansi-to-html';
import './ConsoleLog.scss';

const bn = cn('ConsoleLog');
const convert = new Convert({ fg: '#000', bg: '#000' });

export interface IConsoleLogProps {
  className?: string;
  accent?: boolean;
}

const ConsoleLog: FC<IConsoleLogProps> = (props) => (
  <div
    className={classnames(props.className, bn())}
    data-test="console-log"
  >
    <pre
    className={bn('Wrappper')}
    dangerouslySetInnerHTML={{
      __html: (typeof props.children === 'string')
        ? convert.toHtml(props.children) : ''
    }} />
  </div>
);

export default ConsoleLog;
