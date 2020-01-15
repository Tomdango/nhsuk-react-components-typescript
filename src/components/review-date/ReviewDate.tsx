import React, { HTMLProps } from 'react';
import classNames from 'classnames';

interface ReviewDateProps extends HTMLProps<HTMLDivElement> {
  lastReview?: string;
  nextReview?: string;
}

const ReviewDate: React.FC<ReviewDateProps> = ({ className, lastReview, nextReview, ...rest }) => (
  <div className={classNames('nhsuk-review-date', className)} {...rest}>
    <p className="nhsuk-body-s">
      {lastReview ? `Page last reviewed: ${lastReview}` : null}
      {lastReview && nextReview ? <br /> : null}
      {nextReview ? `Next review due: ${nextReview}` : null}
    </p>
  </div>
);

export default ReviewDate;
