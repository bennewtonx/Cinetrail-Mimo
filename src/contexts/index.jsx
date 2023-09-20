import React from 'react';

import ThemeContextProvider from './ThemeContext';
import UserContextProvider from './UserContext';

export default function ContextReducer({ children }) {
  return (
    <ThemeContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeContextProvider>
  );
}