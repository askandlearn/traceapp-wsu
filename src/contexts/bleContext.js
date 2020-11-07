import React, {createContext} from 'react';

export const bleContext = createContext();

export const bleProvider = ({children}) => {
  return <bleContext.Provider>{children}</bleContext.Provider>;
};
