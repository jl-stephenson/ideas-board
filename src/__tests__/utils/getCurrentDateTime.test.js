import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentDateTime } from "../../utils/getCurrentDateTime";

describe("get current date and time", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns accurate timestamp", () => {
    const mockDate = new Date(2000, 1, 1, 12);
    const timeNow = mockDate.getTime();
    vi.setSystemTime(mockDate);

    const { timestamp } = getCurrentDateTime();

    expect(timestamp).toEqual(timeNow);
  });

  it("returns accurate date string", () => {
    const mockDate = new Date(2000, 1, 1, 10);
    const dateString = mockDate.toLocaleDateString();
    vi.setSystemTime(mockDate);

    const { date } = getCurrentDateTime();

    expect(date).toEqual(dateString);
  });

  it("returns accurate time string", () => {
    const mockDate = new Date(2000, 1, 1, 15, 10);
    const timeString = mockDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    vi.setSystemTime(mockDate);

    const { time } = getCurrentDateTime();

    expect(time).toEqual(timeString);
  });
});
