'use client';

import { Provider } from 'react-redux';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/lib/redux/store';

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};
