import styled from "styled-components";


const PopupWrapper = styled.div`
display:flex;
position: absolute;
left:50%;
top:50%;
transform: translate(-50%, -50%);
flex-direction: column;
justify-content: center;
align-items: center;
width:80%;
height: 50%;
background-color:black;
z-index:1000;
border: 20px solid transparent;
  border-image: url("/assets/border.png") 30% stretch;
`

export default function PopupHandler({active, text}) {
if (!active) {
    return <></>
} else {

    return <>
    <PopupWrapper>
    <h3>{text}</h3>

    </PopupWrapper>
    </>
}

}