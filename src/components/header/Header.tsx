import React, { HTMLProps } from 'react';
import classNames from 'classnames';
import HeaderSearch from './components/Search';
import { Close } from '../icons';
import { HeaderContext } from './HeaderContext';

interface HeaderState {
  isSearchToggled: boolean;
}

interface NavItemProps extends HTMLProps<HTMLAnchorElement> {
  mobileOnly?: boolean;
}

const HeaderNavItem: React.FC<NavItemProps> = ({ className, children, mobileOnly, ...rest }) => (
  <li
    className={classNames(
      'nhsuk-header__navigation-item',
      { 'nhsuk-header__navigation-item--for-mobile': mobileOnly },
      className,
    )}
  >
    <a className="nhsuk-header__navigation-link" href="/" {...rest}>
      {children}
      <svg
        className="nhsuk-icon nhsuk-icon__chevron-right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
      </svg>
    </a>
  </li>
);

interface HeaderNavProps extends HTMLProps<HTMLDivElement> {
  showCloseButton?: boolean;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ className, children, showCloseButton, ...rest }) => (
  <nav className={classNames('nhsuk-header__navigation', 'js-show', className)} {...rest}>
    <p className="nhsuk-header__navigation-title">
      <span id="label-navigation">Menu</span>
      {showCloseButton ? (
        <button className="nhsuk-header__navigation-close" id="close-menu">
          <Close />
          <span className="nhsuk-u-visually-hidden">Close menu</span>
        </button>
      ) : null}
    </p>
    <ul className="nhsuk-header__navigation-list">{children}</ul>
  </nav>
);

HeaderNav.defaultProps = {
  role: 'navigation',
  showCloseButton: true,
};

class Header extends React.Component<{}, HeaderState> {
  constructor(props: {}, ...rest: any[]) {
    super(props, ...rest);
    this.state = {
      isSearchToggled: false,
    };
  }

  onToggleSearch = (isSearchToggled: boolean): void => this.setState({ isSearchToggled });

  render() {
    const contextValue = {
      onToggleSearch: this.onToggleSearch,
    };
    return (
      <HeaderContext.Provider value={contextValue}>
        <header className="nhsuk-header" role="banner">
          <div className="nhsuk-width-container nhsuk-header__container">
            <div className="nhsuk-header__logo">
              <a className="nhsuk-header__link" href="/" aria-label="NHS homepage">
                <svg
                  className="nhsuk-logo nhsuk-logo--white"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 40 16"
                >
                  <path fill="#fff" d="M0 0h40v16H0z"></path>
                  <path
                    fill="#005eb8"
                    d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
                  ></path>
                </svg>
              </a>
            </div>
            <div
              className={classNames('nhsuk-header__content', {
                'js-show': this.state.isSearchToggled,
              })}
              id="content-header"
            >
              <div className="nhsuk-header__menu">
                <button
                  className="nhsuk-header__menu-toggle"
                  id="toggle-menu"
                  aria-controls="header-navigation"
                  aria-label="Open menu"
                >
                  Menu
                </button>
              </div>
              <HeaderSearch></HeaderSearch>
            </div>
          </div>
          <HeaderNav>
            <HeaderNavItem mobileOnly href="/">
              Home
            </HeaderNavItem>
            <HeaderNavItem href="https://www.nhs.uk/conditions">Health A-Z</HeaderNavItem>
            <HeaderNavItem href="https://www.nhs.uk/live-well/">Live Well</HeaderNavItem>
            <HeaderNavItem href="https://www.nhs.uk/conditions/social-care-and-support/">
              Care and support
            </HeaderNavItem>
            <HeaderNavItem href="https://www.nhs.uk/news/">Health news</HeaderNavItem>
            <HeaderNavItem href="https://www.nhs.uk/service-search">
              Services near you
            </HeaderNavItem>
          </HeaderNav>
        </header>
      </HeaderContext.Provider>
    );
  }
}

export default Header;
