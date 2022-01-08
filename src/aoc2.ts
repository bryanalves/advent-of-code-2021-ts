import fs from 'fs';

function parsedInput(): string[] {
  const input: string = fs.readFileSync('./res/aoc2.txt', 'utf8');
//   const input = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2
// `;

  return input.split("\n").slice(0, -1);
}

function part1() {
  const parsed = parsedInput();
  const position = parsed.reduce((a, b) => {
    const instruction = b.split(' ');
    const amount = parseInt(instruction[1]);
    switch (instruction[0]) {
      case 'forward':
        return [a[0] + amount, a[1]];
      case 'up':
        return [a[0], a[1] - amount];
      case 'down':
        return [a[0], a[1] + amount];
    }
  }, [0, 0]);
  
  return position[0] * position[1];
}

function part2() {
  const parsed = parsedInput();
  const position = parsed.reduce((a, b) => {
    const instruction = b.split(' ');
    const amount = parseInt(instruction[1]);
    switch (instruction[0]) {
      case 'forward':
        return [a[0] + amount, a[1] + (a[2] * amount) , a[2]];
      case 'up':
        return [a[0], a[1], a[2] - amount];
      case 'down':
        return [a[0], a[1], a[2] + amount];
    }
  }, [0, 0, 0]);

  return position[0] * position[1];
}
console.log(part1());
console.log(part2());
