import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  
    box-sizing: border-box;
    cursor: default;
    
  }

  body {
    width:100vw;
    height:100vh;
 
    padding: 0;
    margin: 0;
    font-family: Georgia, "Times New Roman", Times, serif;
  
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
