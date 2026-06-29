import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StatCard from "../src/components/StatCard";

describe("StatCard", () => {
  const defaultProps = {
    title: "Assets",
    total: 42,
    detail: "5 con problemas",
    icon: "🗑",
    to: "/assets",
    isLoading: false,
    isError: false,
  };

  it("renders title and total correctly", () => {
    render(
      <MemoryRouter>
        <StatCard {...defaultProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("5 con problemas")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <MemoryRouter>
        <StatCard {...defaultProps} isLoading={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(
      <MemoryRouter>
        <StatCard {...defaultProps} isError={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
  });
});
