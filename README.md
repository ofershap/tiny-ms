# ms-tiny

[![npm version](https://img.shields.io/npm/v/ms-tiny.svg)](https://www.npmjs.com/package/ms-tiny)
[![npm downloads](https://img.shields.io/npm/dm/ms-tiny.svg)](https://www.npmjs.com/package/ms-tiny)
[![CI](https://github.com/ofershap/tiny-ms/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/tiny-ms/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Parse and format time durations in milliseconds. Like [`ms`](https://github.com/vercel/ms), but with native TypeScript, ESM + CJS, and compound duration support.

```ts
import { parse, format } from "ms-tiny";

parse("2h"); // 7_200_000
parse("1d 3h 30m"); // 99_000_000
format(3_600_000); // "1h"
```

> 833 bytes gzipped. Zero dependencies.

![Demo](assets/demo.gif)

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

Invalid input throws instead of returning `undefined`:

```ts
parse(""); // throws TypeError
parse("hello"); // throws TypeError
format(NaN); // throws TypeError
format(Infinity); // throws TypeError
```

## Differences from `ms`

|               | `ms`        | `ms-tiny`  |
| ------------- | ----------- | ---------- |
| TypeScript    | `@types/ms` | built-in   |
| ESM           | no          | ESM + CJS  |
| Invalid input | `undefined` | throws     |
| Compound      | no          | `"1h 30m"` |
| Size (gzip)   | ~950B       | 833B       |

The API is split into `parse` and `format` instead of a single overloaded function.

## Migrating from `ms`

```diff
- import ms from "ms";
- const timeout = ms("2h");
- const label = ms(60000);
+ import { parse, format } from "ms-tiny";
+ const timeout = parse("2h");
+ const label = format(60000);
```

## API

### `parse(value: string): number`

Parses a duration string and returns milliseconds.

### `format(ms: number, options?: { long?: boolean }): string`

Formats milliseconds to a readable string. `{ long: true }` gives `"2 hours"` instead of `"2h"`.

## Author

[![Made by ofershap](https://gitshow.dev/api/card/ofershap)](https://gitshow.dev/ofershap)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ofershap)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github&logoColor=white)](https://github.com/ofershap)

## License

[MIT](LICENSE) &copy; [Ofer Shapira](https://github.com/ofershap)
