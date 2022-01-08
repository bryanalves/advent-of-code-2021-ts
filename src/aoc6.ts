import fs from 'fs';

function parsedInput(): string[] {
  const input: string = fs.readFileSync('./res/aoc6.txt', 'utf8');
  // const input = "3,4,3,1,2";
  return input.split(',').map(i => parseInt(i))
}

function runSim(days) {
  let fish = parsedInput();

  const fishdict = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}
  for (const f of fish) fishdict[f]++;

  for (let i = 0 ; i < days ; i++) {
    const temp = fishdict[0];
    fishdict[0] = fishdict[1];
    fishdict[1] = fishdict[2];
    fishdict[2] = fishdict[3];
    fishdict[3] = fishdict[4];
    fishdict[4] = fishdict[5];
    fishdict[5] = fishdict[6];
    fishdict[6] = fishdict[7] + temp;
    fishdict[7] = fishdict[8];
    fishdict[8] = temp;
  }

  return fishdict[0]
    + fishdict[1]
    + fishdict[2]
    + fishdict[3]
    + fishdict[4]
    + fishdict[5]
    + fishdict[6]
    + fishdict[7]
    + fishdict[8];
}

function part1() {
  return runSim(80);
}

function part2() {
  return runSim(256);
}

console.log(part1());
console.log(part2());
