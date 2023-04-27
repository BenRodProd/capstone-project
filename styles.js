import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  
    box-sizing: border-box;
    max-width: 400px;
    max-height: 720px;
    
  }

  body {

    margin: 0;
    font-family: system-ui;
    display:flexbox;
    justify-content:center;
    text-align: center;
    background-color: black;
    color: white;
    
  }
`;
