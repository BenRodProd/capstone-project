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
.clickable {
  
  animation: blink 3s linear 2s infinite alternate;
}
@keyframes blink {
  0%{
    filter: drop-shadow(0px 0px 0px #FFFFFF);
  }
  50%{
    filter: drop-shadow(0px 0px 8px #FFFFFF);
  }
  100%{
    filter: drop-shadow(0px 0px 0px #FFFFFF);
  }
  
}

`;
