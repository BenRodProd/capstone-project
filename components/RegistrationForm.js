import styled from "styled-components"
import RPGButton from "./Button"
import Image from "next/image";

const RegistrationWrapper = styled.div`
position: absolute;
flex-direction: column;
top:50%;
left:50%;
width:100%;
height: 100%;

transform: translate(-50%, -50%);
background-color: black;

z-index:1001;
justify-content: center;
text-align: center;

`
const StyledButtons = styled.button`
  background-color: transparent;
  border: none;
`;
const ItemWrapper = styled.div`
margin: 7rem;

flex-direction: column;
align-content: space-around;
justify-content: center;

`

const StyledForm=styled.form`
margin-top: 5rem;
`

export default function RegistrationForm({handleRegistration, onCancelRegistration}) {

    return <>
    <RegistrationWrapper>
        <ItemWrapper>
    <h2>No such user Name! Create a new user?</h2>
        <StyledForm onSubmit={handleRegistration}>
    <input autoFocus required max="10" type ="text" placeholder = "Name" name ="name" ></input>
    <input required max="10" type ="text" placeholder = "Password" name ="password" ></input>
    <RPGButton text="Submit" />
    
    </StyledForm>
    <StyledButtons onClick={onCancelRegistration} name="cancel" type="button">
            <Image src="/assets/no.png" width="60" height="60" alt="no" />
          </StyledButtons>
    </ItemWrapper>
    </RegistrationWrapper>
    </>
}