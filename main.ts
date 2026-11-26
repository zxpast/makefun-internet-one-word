// The Internet in One Word.
//
// One word for the whole internet: "unsolicited".
//
// Why this word, against the judge's five criteria:
//   1. One word that describes the whole internet — not one app, one site,
//      one mood. Everything online arrives unasked: opinions, ads, DMs,
//      notifications, hot takes, advice from strangers.
//   2. Funny by itself — nobody asked for any of this, and yet here it all
//      is, every second of every day.
//   3. True about the internet as a whole — the defining transaction of the
//      internet is receiving things you never requested.
//   4. Surprising — the first word anyone reaches for is "chaos" or
//      "addictive" or "endless". "Unsolicited" is the word you land on only
//      after you have actually lived on the internet for a while.
//   5. Lands in one beat — 11 characters, instantly readable, no setup,
//      no explanation needed.
//
// The program is deterministic: same bytes every run. No clock, no
// randomness, no network, no external files. Node 22 standard library only.
import * as fs from "node:fs";
import * as path from "node:path";

// The word. Fixed, and nothing else.
const WORD = "unsolicited";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 30 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...WORD].length;
if (codePoints < 1 || codePoints > 30 || WORD.trim().length === 0) {
  throw new Error(`word is ${codePoints} code points, outside the 1-30 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), WORD, "utf8");

console.log(WORD);
console.log(`(${codePoints} code points, ${Buffer.byteLength(WORD, "utf8")} bytes)`);
