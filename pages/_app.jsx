import { ThemeProvider } from 'styled-components';
import { theme } from '~/styles/theme';
import { GlobalStyles } from '~/styles/global';

/* eslint-disable react/prop-types */
const PokedexApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || (({ children }) => children);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default PokedexApp;
