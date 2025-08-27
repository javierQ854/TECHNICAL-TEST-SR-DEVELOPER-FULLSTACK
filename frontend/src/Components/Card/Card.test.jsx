// src/components/Card/Card.test.jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Card from "./Card";

// Mock del helper formato
vi.mock("../../Utils/format", () => ({
  formato: (value) => `\$${value}`,
}));

describe("Card Component", () => {
  const props = {
    usuario: "Apartamento Central",
    addres: "Cra 7 #123-45",
    price: 350000000,
    year: 2025,
    nameOwner: "Juan Perez",
    id: 1,
  };

  it("renders the card with correct data", () => {
    render(
      <BrowserRouter>
        <Card {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("Apartamento Central")).toBeInTheDocument();
    expect(screen.getByText("Cra 7 #123-45")).toBeInTheDocument();
    expect(screen.getByText("$350000000")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    // nameOwner está hidden, no se verifica visualmente
  });

  it("has correct link", () => {
    render(
      <BrowserRouter>
        <Card {...props} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/propertie/1");
  });
});
