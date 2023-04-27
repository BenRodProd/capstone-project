import { useRouter } from "next/router";
import styled from "styled-components";

const StyledForm = styled.form`
  display: grid;
  gap: 2rem;
  flex-direction: column;
`;

export default function AddWisdom({ handleNewWisdomSubmit }) {
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const wisdomData = Object.fromEntries(formData);
    handleNewWisdomSubmit({ ...wisdomData, answeredRight: 0 });
    router.push("/");
  }

  return (
    <>
      <StyledForm onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="question">Enter Question:</label>
        <input required name="question" type="text"></input>
        <label htmlFor="answer">Enter Answer:</label>
        <input required name="answer" type="text"></input>
        <label htmlFor="category">Pick a Category:</label>
        <select name="category">
          <option value="Vehicles">Vehicles</option>
          <option value="Food">Food</option>
          <option value="Basics">Basics</option>
          <option value="Javascript">Javascript</option>
        </select>
        <select name="benefit">
          <option value="health">Health</option>
          <option value="armor">Armor</option>
          <option value="stamina">Stamina</option>
        </select>
        <button type="submit">submit</button>
      </StyledForm>
    </>
  );
}
