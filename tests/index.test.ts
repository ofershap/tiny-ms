import { describe, it, expect } from "vitest";
import { parse, format } from "../src/index.js";

describe("parse", () => {
  it("parses milliseconds", () => {
    expect(parse("100ms")).toBe(100);
    expect(parse("50msecs")).toBe(50);
    expect(parse("200 milliseconds")).toBe(200);
  });

  it("parses seconds", () => {
    expect(parse("1s")).toBe(1000);
    expect(parse("5sec")).toBe(5000);
    expect(parse("2 seconds")).toBe(2000);
    expect(parse("0.5s")).toBe(500);
  });

  it("parses minutes", () => {
    expect(parse("1m")).toBe(60_000);
    expect(parse("5min")).toBe(300_000);
    expect(parse("2 minutes")).toBe(120_000);
  });

  it("parses hours", () => {
    expect(parse("1h")).toBe(3_600_000);
    expect(parse("2hr")).toBe(7_200_000);
    expect(parse("3 hours")).toBe(10_800_000);
  });

  it("parses days", () => {
    expect(parse("1d")).toBe(86_400_000);
    expect(parse("2 days")).toBe(172_800_000);
  });

  it("parses weeks", () => {
    expect(parse("1w")).toBe(604_800_000);
    expect(parse("2 weeks")).toBe(1_209_600_000);
  });

  it("parses months", () => {
    expect(parse("1mo")).toBe(2_592_000_000);
    expect(parse("2 months")).toBe(5_184_000_000);
  });

  it("parses years", () => {
    expect(parse("1y")).toBe(31_557_600_000);
    expect(parse("2 years")).toBe(63_115_200_000);
  });

  it("parses negative values", () => {
    expect(parse("-1s")).toBe(-1000);
    expect(parse("-3h")).toBe(-10_800_000);
  });

  it("parses decimal values", () => {
    expect(parse("1.5s")).toBe(1500);
    expect(parse("0.5h")).toBe(1_800_000);
  });

  it("parses bare numbers as milliseconds", () => {
    expect(parse("500")).toBe(500);
    expect(parse("0")).toBe(0);
  });

  it("is case-insensitive", () => {
    expect(parse("1H")).toBe(3_600_000);
    expect(parse("2S")).toBe(2000);
    expect(parse("1 Hour")).toBe(3_600_000);
  });

  it("parses compound durations", () => {
    expect(parse("1h 30m")).toBe(5_400_000);
    expect(parse("1d 2h 30m")).toBe(95_400_000);
    expect(parse("2h30m")).toBe(9_000_000);
    expect(parse("1m 30s")).toBe(90_000);
  });

  it("throws on empty string", () => {
    expect(() => parse("")).toThrow(TypeError);
  });

  it("throws on invalid input", () => {
    expect(() => parse("hello")).toThrow(TypeError);
    expect(() => parse("abc123")).toThrow(TypeError);
  });

  it("throws on non-string input", () => {
    expect(() => parse(42 as unknown as string)).toThrow(TypeError);
    expect(() => parse(undefined as unknown as string)).toThrow(TypeError);
  });

  it("throws on string > 100 chars", () => {
    expect(() => parse("x".repeat(101))).toThrow(TypeError);
  });
});

describe("format", () => {
  it("formats milliseconds", () => {
    expect(format(0)).toBe("0ms");
    expect(format(500)).toBe("500ms");
    expect(format(999)).toBe("999ms");
  });

  it("formats seconds", () => {
    expect(format(1000)).toBe("1s");
    expect(format(5000)).toBe("5s");
    expect(format(1500)).toBe("2s");
  });

  it("formats minutes", () => {
    expect(format(60_000)).toBe("1m");
    expect(format(120_000)).toBe("2m");
  });

  it("formats hours", () => {
    expect(format(3_600_000)).toBe("1h");
    expect(format(7_200_000)).toBe("2h");
  });

  it("formats days", () => {
    expect(format(86_400_000)).toBe("1d");
    expect(format(172_800_000)).toBe("2d");
  });

  it("formats years", () => {
    expect(format(31_557_600_000)).toBe("1y");
  });

  it("formats negative values", () => {
    expect(format(-1000)).toBe("-1s");
    expect(format(-3_600_000)).toBe("-1h");
  });

  it("formats long form", () => {
    expect(format(1000, { long: true })).toBe("1 second");
    expect(format(2000, { long: true })).toBe("2 seconds");
    expect(format(60_000, { long: true })).toBe("1 minute");
    expect(format(120_000, { long: true })).toBe("2 minutes");
    expect(format(3_600_000, { long: true })).toBe("1 hour");
    expect(format(7_200_000, { long: true })).toBe("2 hours");
    expect(format(86_400_000, { long: true })).toBe("1 day");
    expect(format(172_800_000, { long: true })).toBe("2 days");
    expect(format(31_557_600_000, { long: true })).toBe("1 year");
    expect(format(500, { long: true })).toBe("500 ms");
  });

  it("throws on non-number", () => {
    expect(() => format("foo" as unknown as number)).toThrow(TypeError);
  });

  it("throws on NaN", () => {
    expect(() => format(NaN)).toThrow(TypeError);
  });

  it("throws on Infinity", () => {
    expect(() => format(Infinity)).toThrow(TypeError);
  });
});
