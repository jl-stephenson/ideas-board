import { describe, expect, it } from "vitest";
import { sortIdeas } from "./sortIdeas";
import { Idea } from "./types/types";

describe("sort ideas", () => {
  const mockIdeas: Idea[] = [
    {
      id: "1",
      title: "Apple",
      content: "",
      createdTimestamp: 1740643512500,
      updatedTimestamp: 1740643512515,
    },
    {
      id: "2",
      title: "Zebra",
      content: "",
      createdTimestamp: 1740643512500,
      updatedTimestamp: 1740643512520,
    },
    {
      id: "3",
      title: "banana",
      content: "",
      createdTimestamp: 1740643512500,
      updatedTimestamp: 1740643512510,
    },
  ];

  it("correctly sorts ideas A - Z", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "alphabeticalAsc");
    expect(sortedIdeas).toEqual([
      {
        id: "1",
        title: "Apple",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512515,
      },
      {
        id: "3",
        title: "banana",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512510,
      },
      {
        id: "2",
        title: "Zebra",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512520,
      },
    ]);
  });

  it("correctly sorts ideas Z - A", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "alphabeticalDesc");
    expect(sortedIdeas).toEqual([
      {
        id: "2",
        title: "Zebra",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512520,
      },
      {
        id: "3",
        title: "banana",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512510,
      },
      {
        id: "1",
        title: "Apple",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512515,
      },
    ]);
  });

  it("correctly sorts ideas most recent first", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "updatedAsc");
    expect(sortedIdeas).toEqual([
      {
        id: "2",
        title: "Zebra",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512520,
      },
      {
        id: "1",
        title: "Apple",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512515,
      },
      {
        id: "3",
        title: "banana",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512510,
      },
    ]);
  });

  it("correctly sorts ideas most recent first", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "updatedDesc");
    expect(sortedIdeas).toEqual([
      {
        id: "3",
        title: "banana",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512510,
      },
      {
        id: "1",
        title: "Apple",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512515,
      },
      {
        id: "2",
        title: "Zebra",
        content: "",
        createdTimestamp: 1740643512500,
        updatedTimestamp: 1740643512520,
      },
    ]);
  });
});
