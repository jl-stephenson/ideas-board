import { describe, expect, it } from "vitest";
import { sortIdeas } from "../../utils/sortIdeas";

describe("sort ideas", () => {
  const mockIdeas = [
    { title: "Apple", updatedTimestamp: 1740643512515 },
    { title: "Zebra", updatedTimestamp: 1740643512520 },
    { title: "banana", updatedTimestamp: 1740643512510 },
  ];

  it("correctly sorts ideas A - Z", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "alphabeticalAsc");
    expect(sortedIdeas).toEqual([
      { title: "Apple", updatedTimestamp: 1740643512515 },
      { title: "banana", updatedTimestamp: 1740643512510 },
      { title: "Zebra", updatedTimestamp: 1740643512520 },
    ]);
  });

  it("correctly sorts ideas Z - A", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "alphabeticalDesc");
    expect(sortedIdeas).toEqual([
      { title: "Zebra", updatedTimestamp: 1740643512520 },
      { title: "banana", updatedTimestamp: 1740643512510 },
      { title: "Apple", updatedTimestamp: 1740643512515 },
    ]);
  });

  it("correctly sorts ideas most recent first", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "updatedAsc");
    expect(sortedIdeas).toEqual([
      { title: "Zebra", updatedTimestamp: 1740643512520 },
      { title: "Apple", updatedTimestamp: 1740643512515 },
      { title: "banana", updatedTimestamp: 1740643512510 },
    ]);
  });

  it("correctly sorts ideas most recent first", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "updatedDesc");
    expect(sortedIdeas).toEqual([
      { title: "banana", updatedTimestamp: 1740643512510 },
      { title: "Apple", updatedTimestamp: 1740643512515 },
      { title: "Zebra", updatedTimestamp: 1740643512520 },
    ]);
  });

  it("deals correctly with invalid sortType", () => {
    const sortedIdeas = sortIdeas(mockIdeas, "random");
    expect(sortedIdeas).toEqual(mockIdeas);
  });
});
