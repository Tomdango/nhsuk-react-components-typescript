import React, { useContext, useState, SyntheticEvent } from 'react';
import { HeaderContext } from '../HeaderContext';
import classNames from 'classnames';

const HeaderSearch: React.FC = () => {
  const { onToggleSearch } = useContext(HeaderContext);
  const [isToggled, setToggle] = useState(false);
  const toggleSearch = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setToggle(!isToggled);
    onToggleSearch(!isToggled);
  };

  return (
    <div className="nhsuk-header__search">
      <button
        className={classNames('nhsuk-header__search-toggle', { 'is-active': isToggled })}
        onClick={toggleSearch}
        aria-controls="search"
        aria-label="Open search"
      >
        <svg
          className="nhsuk-icon nhsuk-icon__search"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
        </svg>
        <span className="nhsuk-u-visually-hidden">Search</span>
      </button>
      <div className={classNames('nhsuk-header__search-wrap', { 'js-show': isToggled })}>
        <form
          className="nhsuk-header__search-form"
          id="search"
          action="/search/"
          method="get"
          role="search"
        >
          <label className="nhsuk-u-visually-hidden">Search the NHS website</label>
          <div className="autocomplete-container" id="autocomplete-container"></div>
          <input
            className="nhsuk-search__input"
            id="search-field"
            name="search-field"
            type="search"
            placeholder="Search"
            autoComplete="off"
          />
          <button className="nhsuk-search__submit" type="submit">
            <svg
              className="nhsuk-icon nhsuk-icon__search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Search</span>
          </button>
          <button className="nhsuk-search__close" onClick={toggleSearch}>
            <svg
              className="nhsuk-icon nhsuk-icon__close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Close search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeaderSearch;
