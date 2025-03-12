import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App render", () => {
  it("renders the create idea button", () => {
    render(<App />);
    const createButton = screen.getByRole("button");

    expect(createButton.textContent).toEqual("Create New Idea");
  });
});
