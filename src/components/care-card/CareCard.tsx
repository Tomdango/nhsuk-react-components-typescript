import React, { HTMLProps, createContext, useContext } from 'react';
import classNames from 'classnames';
import HeadingLevel, { HeadingLevelType } from '../../util/HeadingLevel';

type CareCardType = 'non-urgent' | 'urgent' | 'immediate';

interface CareCardProps extends HTMLProps<HTMLDivElement> {
  type: CareCardType;
}

const CareCardContext = createContext<CareCardType>('non-urgent');

const genHiddenText = (cardType: CareCardType): string => {
  switch (cardType) {
    case 'non-urgent':
      return 'Non-urgent advice: ';
    case 'urgent':
      return 'Urgent advice: ';
    case 'immediate':
      return 'Immediate action required: ';
  }
};

const CareCardContent: React.FC<HTMLProps<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={classNames('nhsuk-care-card__content', className)} {...rest} />
);

interface CareCardHeadingProps extends HTMLProps<HTMLHeadingElement> {
  visuallyHiddenText?: false | string;
  headingLevel?: HeadingLevelType;
}

const CareCardHeading: React.FC<CareCardHeadingProps> = ({
  className,
  children,
  visuallyHiddenText,
  headingLevel,
  ...rest
}) => {
  const cardType = useContext(CareCardContext);
  return (
    <div className="nhsuk-care-card__heading-container">
      <HeadingLevel
        className={classNames('nhsuk-care-card__heading', className)}
        headingLevel={headingLevel}
        {...rest}
      >
        <span role="heading">
          {visuallyHiddenText !== false ? (
            <span className="nhsuk-u-visually-hidden">
              {visuallyHiddenText || genHiddenText(cardType)}
            </span>
          ) : null}
          {children}
        </span>
      </HeadingLevel>
      <span className="nhsuk-care-card__arrow" aria-hidden="true" />
    </div>
  );
};

interface CareCard extends React.FC<CareCardProps> {
  Content: React.FC<HTMLProps<HTMLDivElement>>;
  Heading: React.FC<CareCardHeadingProps>;
}

const CareCard: CareCard = ({ className, type, children, ...rest }) => (
  <div className={classNames('nhsuk-care-card', `nhsuk-care-card--${type}`, className)} {...rest}>
    <CareCardContext.Provider value={type}>{children}</CareCardContext.Provider>
  </div>
);

CareCard.Content = CareCardContent;
CareCard.Heading = CareCardHeading;

export default CareCard;
