import fs from 'fs';

function parsedInput(): string[] {
  const input: string = fs.readFileSync('./res/aoc3.txt', 'utf8');
//   const input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010
// `;

  return input.split("\n").slice(0, -1);
}

function part1() {
  const parsed = parsedInput();
  const retval = buildFrequencies(parsed);

  return parseInt(gamma(retval), 2) * parseInt(epsilon(retval), 2);
}

function part2() {
  const parsed = parsedInput();
  return parseInt(oxygen([...parsed]), 2) * parseInt(co2([...parsed]), 2);
}

function buildFrequencies(input: string[]) {
  const length = input[0].length
  const retval = []
  for (const i = 0 ; i < length ; i++) retval.push([0, 0])

  input.forEach((i) => {
    for (let elem = 0 ; elem < length ; elem++) {
      retval[elem][parseInt(i[elem])]++
    }
  });

  return retval;
}

function oxygen(data) {
  const length = data[0].length

  for (let i = 0 ; i < length ; i++) {
    if (data.length == 1) return data[0];
    const g = gamma(buildFrequencies(data));
    data = data.filter(p => p[i] == g[i])
  }

  return data[0];
}

function co2(data) {
  const length = data[0].length

  for (let i = 0 ; i < length ; i++) {
    if (data.length == 1) return data[0];
    const g = epsilon(buildFrequencies(data));
    data = data.filter(p => p[i] == g[i])
  }

  return data[0];
}

function gamma(binary: string) {
  return binary.map(i => {
    if (i[0] > i[1])
      return '0';
    else
      return '1';
  }).join('');
}

function epsilon(binary: string ) {
  return binary.map(i => {
    if (i[0] <= i[1])
      return '0';
    else
      return '1';
  }).join('');
}

console.log(part1());
console.log(part2());
