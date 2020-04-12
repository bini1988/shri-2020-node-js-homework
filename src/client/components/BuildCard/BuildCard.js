import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './BuildCard.scss';
import CommitSpan from '../CommitSpan';
import OwnerSpan from '../OwnerSpan';
import DateTime from '../DateTime';

const bn = cn('BuildCard');

/**
 * Карточка сборки
 */
function BuildCard(props) {
  const {
    className, interactive, view, card = {},
  } = props;
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

  const endDate = new Date(duration + (+new Date(0)));

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
            dateTime={endDate}
          />
        </div>
      </div>
    </article>
  );
}

BuildCard.propTypes = {
  className: PropTypes.string,
  /** Карточка интерактивна */
  interactive: PropTypes.bool,
  /** Вид отображения карточки */
  view: PropTypes.string,
  /** Параметры карточки сборки */
  card: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.oneOf([
      'Waiting',
      'InProgress',
      'Success',
      'Fail',
      'Canceled',
    ]),
    buildNumber: PropTypes.number,
    commitMessage: PropTypes.string,
    branchName: PropTypes.string,
    commitHash: PropTypes.string,
    authorName: PropTypes.string,
    start: PropTypes.string,
    duration: PropTypes.number,
  }),
};

export default BuildCard;
