import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Answer from "./Answer";

describe("Answer component", () => {
  test("renders input fields for each letter in the answer", () => {
    render(<Answer answer="test" handleNextQuestion={() => {}} />);
    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields.length).toBe(4);
  });

  test("allows the user to input a letter for each input field", () => {
    render(<Answer answer="test" handleNextQuestion={() => {}} />);
    const inputFields = screen.getAllByRole("textbox");
    fireEvent.change(inputFields[0], { target: { value: "t" } });
    expect(inputFields[0].value).toBe("t");
    fireEvent.change(inputFields[1], { target: { value: "e" } });
    expect(inputFields[1].value).toBe("e");
    fireEvent.change(inputFields[2], { target: { value: "s" } });
    expect(inputFields[2].value).toBe("s");
    fireEvent.change(inputFields[3], { target: { value: "t" } });
    expect(inputFields[3].value).toBe("t");
  });

  test("focuses on the first input field when the component is mounted", () => {
    render(<Answer answer="test" handleNextQuestion={() => {}} />);
    const inputFields = screen.getAllByRole("textbox");
    expect(document.activeElement).toBe(inputFields[0]);
  });
});
