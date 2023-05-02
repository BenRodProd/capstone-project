import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  
    box-sizing: border-box;
    
    
  }

  body {
    
    margin: 0;
    font-family: system-ui;
    display: flex;
    justify-content:center;
    text-align: center;
    background-color: black;
    color: white;
    
  }


`;
