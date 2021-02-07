import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --purple: #8E7DBE;
    --green: #99C1B9;
    --red: #D88C9A;
    --yellow: #F2D0A9;
    --beige: #F1E3D3;
    --dark: #1B221B;
    --grey: #E8EDE8;
    --shadow-light: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
    --corner-radius: 5px;
    --rounded: 50%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    color: var(--dark);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  `;
