import React, { HTMLProps, createContext, useContext } from 'react';
import classNames from 'classnames';
import { Tick, Cross } from '../icons';
import HeadingLevel, { HeadingLevelType } from '../../util/HeadingLevel';

type listType = 'do' | 'dont';

interface DoDontListProps extends HTMLProps<HTMLDivElement> {
  listType: listType;
  headingLevel?: HeadingLevelType;
}

interface DoDontList extends React.FC<DoDontListProps> {
  Item: React.FC<HTMLProps<HTMLLIElement>>;
}

const DoDontListContext = createContext<listType>('do');

const DoDontList: DoDontList = ({ className, listType, children, headingLevel, ...rest }) => {
  return (
    <div className={classNames('nhsuk-do-dont-list', className)} {...rest}>
      <HeadingLevel className="nhsuk-do-dont-list__label" headingLevel={headingLevel}>
        {listType === 'do' ? 'Do' : "Don't"}
      </HeadingLevel>
      <ul
        className={classNames(
          'nhsuk-list',
          { 'nhsuk-list--tick': listType === 'do' },
          { 'nhsuk-list--cross': listType === 'dont' },
        )}
      >
        <DoDontListContext.Provider value={listType}>{children}</DoDontListContext.Provider>
      </ul>
    </div>
  );
};

const DoDontItem: React.FC<HTMLProps<HTMLLIElement>> = ({ className, children, ...rest }) => {
  const listType: listType = useContext(DoDontListContext);
  return (
    <li {...rest}>
      {listType === 'do' ? <Tick /> : <Cross />}
      {children}
    </li>
  );
};

DoDontList.Item = DoDontItem;

export default DoDontList;
