import TableSessions from "../../app/dashboard/upcomming/components/TableSessions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock firebase app instance

const sessions = [
  {
    id: 1,
    date: "2022-03-15T14:30:00.000Z",
    title: "Session 1",
    description: "Yoga",
    time: "10:00 AM",
  },
];

describe("TableSessions", () => {
  it("displays a modal when the AddNewSessions component is clicked and hide it when clicking close button", async () => {
    render(<TableSessions sessions={sessions} />);

    const addButton = screen.getByRole("button", { name: /Add Session/i });
    fireEvent.click(addButton);

    const modal = screen.getByTestId("add-new-session-modal");
    expect(modal).not.toHaveClass("hidden");

    const closeButton = screen.getByTestId("close-add-new-session");
    fireEvent.click(closeButton);
    expect(modal).toHaveClass("hidden");
  });

  it("renders formatted text on table", () => {
    render(<TableSessions sessions={sessions} />);
    const dateText = screen.getByText("2022/15/Mar");
    const sessionTitle = screen.getByText("Session 1");
    const time = screen.getByText("10:00 AM");

    expect(dateText).toBeInTheDocument();
    expect(sessionTitle).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  it("displays a modal when the Edit button is clicked and hide it when clicking close button", async () => {
    render(<TableSessions sessions={sessions} />);

    const addButton = screen.getByTestId("edit-button");
    fireEvent.click(addButton);

    const modal = screen.getByTestId("edit-session-modal");
    expect(modal).not.toHaveClass("hidden");

    const closeButton = screen.getByTestId("close-edit-session-button");
    fireEvent.click(closeButton);
    expect(modal).toHaveClass("hidden");
  });
});
