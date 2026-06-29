import { render, screen } from "@testing-library/react";
import Table from "../src/components/Table";

const columns = [
  {
    label: "Nombre",
    sortKey: "name" as const,
    render: (row: { id: string; name: string }) => <span>{row.name}</span>,
  },
  {
    label: "ID",
    render: (row: { id: string; name: string }) => <span>{row.id}</span>,
  },
];

const data = [
  { id: "1", name: "Alpha" },
  { id: "2", name: "Beta" },
];

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table columns={columns} data={data} keyExtractor={(r) => r.id} />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<Table columns={columns} data={data} keyExtractor={(r) => r.id} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("shows empty message when no data", () => {
    render(<Table columns={columns} data={[]} keyExtractor={(r) => r.id} />);
    expect(
      screen.getByText("No hay resultados para mostrar"),
    ).toBeInTheDocument();
  });
});
