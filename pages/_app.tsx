import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalStyle from 'styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
