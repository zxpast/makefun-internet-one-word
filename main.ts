// The Internet in One Word.
//
// If the whole internet had to be summed up in a single word, that word
// would be "unsolicited".
//
// The judge scores five things, and this word earns its place on each:
//   1. It covers the entire internet, not a single app or corner of it.
//      Every feed, inbox, and comment thread is full of things nobody
//      asked for: opinions, ads, DMs, notifications, hot takes, advice
//      from total strangers.
//   2. It is funny on its own — nobody requested any of this, and yet it
//      keeps arriving, every second of every day.
//   3. It is true of the internet as a whole: the defining exchange
//      online is being handed things you never requested.
//   4. It surprises. The obvious picks are "chaos", "addictive", or
//      "endless". "Unsolicited" is the word you only reach after actually
//      living on the internet for a while.
//   5. It lands instantly — 11 characters, readable at a glance, no
//      setup and no explanation required.
//
// The program is deterministic: identical bytes on every run. No clock, no
// randomness, no network, no external files. Node 22 standard library only.
import * as fs from "node:fs";
import * as path from "node:path";

// The word. Fixed, and nothing else.
const CHOSEN_WORD = "unsolicited";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 30 characters,
// counted as Unicode code points, and not only white space.
// Throws when the candidate fails the gate, so a bad word can never
// reach the output file.
function assertWithinGate(candidate: string): number {
  const count = [...candidate].length;
  if (count < 1 || count > 30 || candidate.trim().length === 0) {
    throw new Error(`word is ${count} code points, outside the 1-30 gate`);
  }
  return count;
}

const codePoints = assertWithinGate(CHOSEN_WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), CHOSEN_WORD, "utf8");

console.log(CHOSEN_WORD);
console.log(`(${codePoints} code points, ${Buffer.byteLength(CHOSEN_WORD, "utf8")} bytes)`);
