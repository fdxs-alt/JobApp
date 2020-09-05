import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
    body {
        width: 100%;
        font-family: 'Poppins', sans-serif;
        height: 100vh;
    }
`;
export default GlobalStyle;
