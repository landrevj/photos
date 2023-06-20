/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { wrapper } from '@/lib/redux/store';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
