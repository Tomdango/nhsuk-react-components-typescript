import { createContext, MouseEvent as ReactMouseEvent } from 'react';

export interface ICheckboxContext {
  isCheckbox: boolean;
  name: string;
  getBoxId: () => string | undefined;
  onChange: (e: ReactMouseEvent<HTMLInputElement, MouseEvent>) => any;
}

export default createContext<ICheckboxContext>({
  isCheckbox: false,
  name: '',
  getBoxId: () => undefined,
  onChange: () => undefined,
});
