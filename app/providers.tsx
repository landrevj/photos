'use client';

import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/lib/redux/store';

const iconValue = { className: 'inline-block' };

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <IconContext.Provider value={iconValue}>
          {children}
        </IconContext.Provider>
      </Provider>
    </SessionProvider>
  );
};
