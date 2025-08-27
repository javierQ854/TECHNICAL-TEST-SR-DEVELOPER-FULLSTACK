// src/components/Input/Input.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

describe("Input Component", () => {
  it("renders a text input with placeholder and value", () => {
    render(
      <Input
        tipo="text"
        placeHolder="Nombre"
        value="Javier"
        onChange={() => {}}
        id="name"
        name="name"
      />
    );

    const inputElement = screen.getByPlaceholderText("Nombre");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Javier");
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("calls onChange when value changes", () => {
    const handleChange = vi.fn();
    render(
      <Input
        tipo="text"
        placeHolder="Nombre"
        value=""
        onChange={handleChange}
        id="name"
        name="name"
      />
    );

    const inputElement = screen.getByPlaceholderText("Nombre");
    fireEvent.change(inputElement, { target: { value: "Nuevo valor" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders a radio input and reflects checked state", () => {
    render(
      <Input
        tipo="radio"
        id="option1"
        name="options"
        value="1"
        checked={true}
        onChange={() => {}}
      />
    );

    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toBeChecked();
  });
});
