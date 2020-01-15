import React, { HTMLProps } from 'react';
import classNames from 'classnames';

interface PanelProps extends HTMLProps<HTMLDivElement> {
  labelProps?: HTMLProps<HTMLHeadingElement>;
  backToTopButton?: boolean;
  backToTopButtonText?: string;
}

const Panel: React.FC<PanelProps> = ({
  className,
  children,
  label,
  labelProps,
  backToTopButton,
  backToTopButtonText,
  ...rest
}) => (
  <li>
    <div className={classNames('nhsuk-list-panel', className)} {...rest}>
      {label ? (
        <h2 className="nhsuk-list-panel__label" {...labelProps}>
          {label}
        </h2>
      ) : null}
      <ul
        className={classNames('nhsuk-list-panel__list', {
          'nhsuk-list-panel__list--with-label': label,
        })}
      >
        {children}
      </ul>
      {backToTopButton ? (
        <div className="nhsuk-back-to-top">
          <a className="nhsuk-back-to-top__link">
            <svg
              className="nhsuk-icon nhsuk-icon__arrow-right"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.6 11.66l-2.73-3A.51.51 0 0 0 16 9v2H5a1 1 0 0 0 0 2h11v2a.5.5 0 0 0 .32.46.39.39 0 0 0 .18 0 .52.52 0 0 0 .37-.16l2.73-3a.5.5 0 0 0 0-.64z"></path>
            </svg>
            {backToTopButtonText || 'Back to top'}
          </a>
        </div>
      ) : null}
    </div>
  </li>
);

const PanelItem: React.FC<HTMLProps<HTMLLIElement>> = ({ className, ...rest }) => (
  <li className={classNames('nhsuk-list-panel__item', className)} {...rest}></li>
);

const PanelLinkItem: React.FC<HTMLProps<HTMLAnchorElement>> = ({ className, ...rest }) => (
  <PanelItem>
    <a className={classNames('nhsuk-list-panel__link', className)} {...rest}></a>
  </PanelItem>
);

interface ListPanelProps extends HTMLProps<HTMLOListElement> {
  type?: 'a' | 'i' | '1' | 'A' | 'I' | undefined;
}

interface ListPanel extends React.FC<ListPanelProps> {
  LinkItem: React.FC<HTMLProps<HTMLAnchorElement>>;
  Item: React.FC<HTMLProps<HTMLLIElement>>;
  Panel: React.FC<PanelProps>;
}

const ListPanel: ListPanel = ({ className, children, ...rest }) => (
  <ol className={classNames('nhsuk-list', className)} {...rest}>
    {children}
  </ol>
);

ListPanel.LinkItem = PanelLinkItem;
ListPanel.Item = PanelItem;
ListPanel.Panel = Panel;

export default ListPanel;
