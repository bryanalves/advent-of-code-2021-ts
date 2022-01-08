import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc14.txt', 'utf8');
//   const input = `NNCB
// 
// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C
// `;

  const start = input.split('\n')[0]
  const mappings = input.split('\n').slice(2, -1).map(i => i.split(' -> '))
  return [start, Object.fromEntries(mappings)]
}

function part1() {
  let [start, mappings] = parsedInput();
  return iterate(start, mappings, 10)
}

function part2() {
  let [start, mappings] = parsedInput();
  return iterate(start, mappings, 40)
}

function iterate(input, mappings, iterations) {
  const letter_counts = {}
  input.split('').forEach(function(s) {
     letter_counts[s] ? letter_counts[s]++ : letter_counts[s] = 1;
  });

  const pair_counts = {}
  for (let i = 0 ; i < input.length - 1 ; i++) {
    const pair = input.slice(i, i + 2)
    pair_counts[pair] ? pair_counts[pair]++ : pair_counts[pair] = 1;
  }

  for (let i = 0 ; i < iterations ; i++) {
    let new_pair_counts = {}

    for (const pair in pair_counts) {
      const match = mappings[pair];
      const count = pair_counts[pair];
      const newpair = `${pair[0]}${match}`;

      if (new_pair_counts[newpair]) 
        new_pair_counts[newpair] += count;
      else
        new_pair_counts[newpair] = count;

      const newpair2 = `${match}${pair[1]}`
      if (new_pair_counts[newpair2]) 
        new_pair_counts[newpair2] += count;
      else
        new_pair_counts[newpair2] = count;
    }

    pair_counts = new_pair_counts
  }

  for (const pair in pair_counts) {
    const freq = pair_counts[pair]
    letter_counts[pair[0]] ? letter_counts[pair[0]] += freq : letter_counts[pair[0]] = freq
    letter_counts[pair[1]] ? letter_counts[pair[1]] += freq : letter_counts[pair[1]] = freq
  }

  let min = Infinity
  let max = 0
  for (const k in letter_counts) {
    const v = letter_counts[k];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  return Math.round((max - min) / 2);
}

console.log(part1())
console.log(part2())
