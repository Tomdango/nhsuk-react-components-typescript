import { createContext } from 'react';

interface HeaderContext {
  onToggleSearch: (value: boolean) => void;
}

export const HeaderContext = createContext<HeaderContext>({
  onToggleSearch: () => {},
});
