import fs from 'fs';

function parsedInput(): number[] {
  const input: string = fs.readFileSync('./res/aoc7.txt', 'utf8');
  // const input = "16,1,2,0,4,2,7,1,2,14";
  return input.split(',').map(i => parseInt(i))
}

function part1() {
  const crabs = parsedInput().sort((a,b) => a - b);

  const half = Math.floor(crabs.length / 2);
  let median = 0;
  if (crabs.length % 2)
    median = crabs[half];
  else
    median = (crabs[half - 1] + crabs[half]) / 2.0;
  
  return crabs.reduce((a, b) => a + Math.abs(b - median), 0)
}

function part2() {
  const crabs = parsedInput().sort((a,b) => a - b);

  const avg = Math.round(
    crabs.reduce(
      (a,b) => a + b, 0
    ) / crabs.length
  )

  const answers = []
  answers.push(
    crabs.reduce((a, b) => {
      const diff = Math.abs(b - avg)

      const fuel = (diff * (diff + 1)) / 2
      return a + fuel
    }, 0)
  );

  answers.push(
    crabs.reduce((a, b) => {
      const diff = Math.abs(b - avg + 1)
      const fuel = (diff * (diff + 1)) / 2
      return a + fuel
    }, 0)
  );

  answers.push(
    crabs.reduce((a, b) => {
      const diff = Math.abs(b - avg - 1)
      const fuel = (diff * (diff + 1)) / 2
      return a + fuel
    }, 0)
  );

  return answers.sort((a,b) => a - b)[0]
}

console.log(part1());
console.log(part2());
