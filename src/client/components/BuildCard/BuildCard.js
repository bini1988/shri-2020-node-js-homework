import React from 'react';
import './BuildCard.scss';
import CommitSpan from '../CommitSpan';
import OwnerSpan from '../OwnerSpan';
import DateTime from '../DateTime';

/**
 * Карточка сборки
 */
function BuildCard() {
  return (
    <article className="BuildCard">
      <div className="BuildCard-Wrapper">
        <div className="BuildCard-Status Status Status_type_success">
          <svg className="BuildCard-Icon" width="24" height="24">
            <use xlinkHref="#done" />
          </svg>
          Success
        </div>
        <div className="BuildCard-Content">
          <h3 className="BuildCard-Title">
            <span className="BuildCard-No Status Status_type_success">
              #1368
            </span>
            <span className="BuildCard-Text">
              add documentation for postgres scaler
            </span>
          </h3>
          <div className="BuildCard-Meta">
            <CommitSpan
              className="BuildCard-Commit"
              branch="master"
              hash="9c9f0b9"
            />
            <OwnerSpan
              className="BuildCard-Owner"
              owner="Philip Kirkorov"
            />
          </div>
        </div>
        <div className="BuildCard-Aside">
          <DateTime
            className="BuildCard-Time"
            view="date"
            dateTime="2020-01-21T03:06:00.000"
          />
          <DateTime
            className="BuildCard-Time"
            view="time"
            dateTime="01:20"
          />
        </div>
      </div>
    </article>
  );
}

export default BuildCard;
