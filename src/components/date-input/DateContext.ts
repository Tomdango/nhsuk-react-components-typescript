import { createContext, FormEvent, RefObject } from 'react';
import { DateInputElementTypes } from './DateInput';

export interface IDateContext {
  isDate: boolean;
  error: boolean;
  id: string | undefined;
  name: string | undefined;
  handleChange: (e: FormEvent<HTMLInputElement>, elementType: DateInputElementTypes) => void;
  handleInput: (e: FormEvent<HTMLInputElement>) => void;
  passBackRef: (elementType: DateInputElementTypes, ref: RefObject<HTMLInputElement>) => void;
  // passError: (elementType: DateInputElementTypes, error: boolean) => void;
}

export default createContext<IDateContext>({
  isDate: false,
  id: undefined,
  name: undefined,
  handleChange: () => {},
  handleInput: () => {},
  passBackRef: (_elementType, _ref) => {},
  error: false,
  // passError: (_elementType, _error) => {},
});
