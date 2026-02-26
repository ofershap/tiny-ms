const S = 1000;
const M = S * 60;
const H = M * 60;
const D = H * 24;
const W = D * 7;
const MO = D * 30;
const Y = D * 365.25;

const UNITS: Record<string, number> = {
  ms: 1,
  millisecond: 1,
  milliseconds: 1,
  msec: 1,
  msecs: 1,
  s: S,
  sec: S,
  secs: S,
  second: S,
  seconds: S,
  m: M,
  min: M,
  mins: M,
  minute: M,
  minutes: M,
  h: H,
  hr: H,
  hrs: H,
  hour: H,
  hours: H,
  d: D,
  day: D,
  days: D,
  w: W,
  week: W,
  weeks: W,
  mo: MO,
  month: MO,
  months: MO,
  y: Y,
  yr: Y,
  yrs: Y,
  year: Y,
  years: Y,
};

const PARSE_RE =
  /(-?\d*\.?\d+)\s*(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|hr?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|yr?|y)/gi;

const SINGLE_RE =
  /^(-?\d*\.?\d+)\s*(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|hr?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|yr?|y)?$/i;

export interface FormatOptions {
  long?: boolean;
}

export function parse(value: string): number {
  if (typeof value !== "string" || value.length === 0 || value.length > 100) {
    throw new TypeError(
      `Expected a non-empty string (max 100 chars), got ${JSON.stringify(value)}`,
    );
  }

  const single = SINGLE_RE.exec(value);
  if (single) {
    const n = parseFloat(single[1] as string);
    const unit = (single[2] ?? "ms").toLowerCase();
    const factor = UNITS[unit];
    if (factor === undefined) {
      throw new TypeError(`Unknown unit: ${unit}`);
    }
    return n * factor;
  }

  PARSE_RE.lastIndex = 0;
  let total = 0;
  let matched = false;
  let match: RegExpExecArray | null;

  while ((match = PARSE_RE.exec(value)) !== null) {
    matched = true;
    const n = parseFloat(match[1] as string);
    const unit = (match[2] as string).toLowerCase();
    const factor = UNITS[unit];
    if (factor === undefined) {
      throw new TypeError(`Unknown unit: ${unit}`);
    }
    total += n * factor;
  }

  if (!matched) {
    throw new TypeError(`Unable to parse: ${JSON.stringify(value)}`);
  }

  return total;
}

export function format(ms: number, options?: FormatOptions): string {
  if (typeof ms !== "number" || !Number.isFinite(ms)) {
    throw new TypeError("Expected a finite number");
  }

  const abs = Math.abs(ms);

  if (options?.long) {
    return fmtLong(ms, abs);
  }

  return fmtShort(ms, abs);
}

function fmtShort(ms: number, abs: number): string {
  if (abs >= Y) return `${Math.round(ms / Y)}y`;
  if (abs >= D) return `${Math.round(ms / D)}d`;
  if (abs >= H) return `${Math.round(ms / H)}h`;
  if (abs >= M) return `${Math.round(ms / M)}m`;
  if (abs >= S) return `${Math.round(ms / S)}s`;
  return `${ms}ms`;
}

function fmtLong(ms: number, abs: number): string {
  if (abs >= Y) return plural(ms, Y, "year");
  if (abs >= D) return plural(ms, D, "day");
  if (abs >= H) return plural(ms, H, "hour");
  if (abs >= M) return plural(ms, M, "minute");
  if (abs >= S) return plural(ms, S, "second");
  return `${ms} ms`;
}

function plural(ms: number, unit: number, name: string): string {
  const n = Math.round(ms / unit);
  return `${n} ${name}${Math.abs(n) !== 1 ? "s" : ""}`;
}
