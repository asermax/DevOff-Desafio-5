import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body, #__next {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 16px;
    height: 100vh;
  }
`;
