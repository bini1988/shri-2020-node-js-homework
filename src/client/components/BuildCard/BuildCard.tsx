import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { addMilliseconds } from 'date-fns';
import './BuildCard.scss';
import CommitSpan from '../CommitSpan';
import OwnerSpan from '../OwnerSpan';
import DateTime from '../DateTime';

const bn = cn('BuildCard');

export interface IBuildCardProps {
  className?: string;
  interactive?: boolean;
  view?: 'details';
  card: CI.Build;
}

const BuildCard: FC<IBuildCardProps> = (props) => {
  const { className, interactive, view, card } = props;
  const {
    id,
    status,
    buildNumber = '--',
    commitMessage,
    branchName,
    commitHash,
    authorName,
    start: startDate,
    duration = 0,
  } = card;

  const endDate = addMilliseconds(
    new Date("1970-01-01T00:00:00.000"), duration
  );

  return (
    <article
      className={classnames(className, bn({ status, interactive, view }))}
      data-test="build-card"
      data-status={status}
      data-id={id}
    >
      <div className={bn('Wrapper')}>
        <div className={bn('Status')}>
          <svg className={bn('Icon')} width="24" height="24">
            <use xlinkHref="#done" />
          </svg>
          {status}
        </div>
        <div className={bn('Content')}>
          <h3 className={bn('Title')}>
            <span className={bn('No')}>
              {`#${buildNumber}`}
            </span>
            {' '}
            <span className={bn('Text')}>
              {commitMessage}
            </span>
          </h3>
          <div className={bn('Meta')}>
            <CommitSpan
              className={bn('Commit')}
              branch={branchName}
              hash={commitHash}
            />
            <OwnerSpan
              className={bn('Owner')}
              owner={authorName}
            />
          </div>
        </div>
        <div className={bn('Aside')}>
          <DateTime
            className={bn('Time')}
            view="date"
            dateTime={startDate}
          />
          <DateTime
            className={bn('Time')}
            view="time"
            dateTime={endDate.toISOString()}
          />
        </div>
      </div>
    </article>
  );
}

export default BuildCard;
