import { render, fireEvent } from "@testing-library/react";
import HomePage from "../pages/index";

describe("HomePage", () => {
  it("decreases armor when an incorrect letter is entered", () => {
    const { getByLabelText, getAllByRole } = render(<HomePage />);
    const inputFields = getAllByRole("textbox");
    const initialArmor = Number(getByLabelText(/armor/i).value);

    fireEvent.change(inputFields[0], { target: { value: "x" } });

    expect(Number(getByLabelText(/armor/i).value)).toBeLessThan(initialArmor);
  });
});
