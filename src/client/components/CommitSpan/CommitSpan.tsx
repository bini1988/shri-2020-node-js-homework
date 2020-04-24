import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './CommitSpan.scss';

const bn = cn('CommitSpan');

export interface ICommitSpanProps {
  className?: string;
  branch: string;
  hash: string;
}

const CommitSpan: FC<ICommitSpanProps> = (props) => (
  <span
    className={classnames(props.className, bn())}
    data-test="commit"
  >
    <span className={bn('Label')}>Commit: </span>
    <svg className={bn('Icon')} width="16" height="16">
      <use xlinkHref="#code-commit" />
    </svg>
    <span className={bn('Branch')} data-test="branch">
      {props.branch}
    </span>
    <span className={bn('Hash')} data-test="hash">
      {props.hash}
    </span>
  </span>
);

export default CommitSpan;
