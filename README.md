# ms-tiny

[![npm version](https://img.shields.io/npm/v/ms-tiny.svg)](https://www.npmjs.com/package/ms-tiny)
[![npm downloads](https://img.shields.io/npm/dm/ms-tiny.svg)](https://www.npmjs.com/package/ms-tiny)
[![CI](https://github.com/ofershap/tiny-ms/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/tiny-ms/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle size](https://img.shields.io/badge/gzip-833_B-brightgreen)](https://github.com/ofershap/tiny-ms)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://github.com/ofershap/tiny-ms)

Parse and format time durations in milliseconds. A modern, type-safe drop-in replacement for [`ms`](https://github.com/vercel/ms).

```ts
import { parse, format } from "ms-tiny";

parse("2h"); // 7_200_000
parse("1d 3h 30m"); // 97_200_000 + 1_800_000
format(3_600_000); // "1h"
```

> Native TypeScript. ESM + CJS. Zero dependencies. Compound durations. Strict error handling.

## Why ms-tiny?

[`ms`](https://github.com/vercel/ms) has 255M weekly downloads but ships without native TypeScript types, has no ESM exports, returns `undefined` on invalid input, and can't parse compound durations like `"1h 30m"`. `ms-tiny` fixes all of that in 833 bytes gzipped.

|               | `ms`                        | `ms-tiny`          |
| ------------- | --------------------------- | ------------------ |
| TypeScript    | needs `@types/ms`           | native             |
| ESM           | no                          | ESM + CJS          |
| Invalid input | returns `undefined` / `NaN` | throws `TypeError` |
| Compound      | no                          | `"1h 30m"` works   |
| Size (gzip)   | ~950B                       | 833B               |

## Install

```bash
npm install ms-tiny
```

## Usage

### Parse strings to milliseconds

```ts
import { parse } from "ms-tiny";

parse("2h"); // 7_200_000
parse("1.5s"); // 1_500
parse("100"); // 100 (bare number = ms)
parse("1d 6h"); // 108_000_000
parse("-3h"); // -10_800_000
```

Supported units: `ms`, `s`/`sec`, `m`/`min`, `h`/`hr`, `d`/`day`, `w`/`week`, `mo`/`month`, `y`/`year` (and their plurals).

### Format milliseconds to strings

```ts
import { format } from "ms-tiny";

format(60_000); // "1m"
format(3_600_000); // "1h"
format(86_400_000, { long: true }); // "1 day"
format(172_800_000, { long: true }); // "2 days"
```

### Error handling

Unlike `ms`, invalid input throws a `TypeError` instead of silently returning `undefined`:

```ts
parse(""); // throws TypeError
parse("hello"); // throws TypeError
format(NaN); // throws TypeError
format(Infinity); // throws TypeError
```

## API

### `parse(value: string): number`

Parses a duration string and returns milliseconds. Throws `TypeError` on invalid input.

### `format(ms: number, options?: { long?: boolean }): string`

Formats milliseconds to a human-readable string. Pass `{ long: true }` for verbose output (`"2 hours"` instead of `"2h"`).

## Migrating from `ms`

```diff
- import ms from "ms";
- const timeout = ms("2h");        // number | undefined
- const label = ms(60000);          // string
+ import { parse, format } from "ms-tiny";
+ const timeout = parse("2h");      // number (throws on invalid)
+ const label = format(60000);      // string
```

## Author

[![Made by ofershap](https://gitshow.dev/api/card/ofershap)](https://gitshow.dev/ofershap)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ofershap)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github&logoColor=white)](https://github.com/ofershap)

## License

MIT
