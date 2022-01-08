import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc11.txt', 'utf8');
//   const input = `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526
// `;

  return input.split('\n').slice(0, -1).map(i => i.split('').map(j => parseInt(j)))
}

function part1() {
  const octopuses = parsedInput();
  let count = 0
  for (let i = 0 ; i < 100 ; i++) {
    count += iterate(octopuses);
  }

  return count;
}

function part2() {
  const octopuses = parsedInput();
  let count = 1
  while (iterate(octopuses) != 100) count++;
  return count;
}

function iterate(octopuses) {
  for (let row = 0 ; row < octopuses.length ; row++) {
    for (let col = 0 ; col < octopuses[0].length ; col++) {
      octopuses[row][col]++;
    }
  }

  let flashedcount = 0;
  let flashed = true;
  const flashed_set = new Set();

  while(flashed) {
    flashed = false;
    for (let row = 0 ; row < octopuses.length ; row++) {
      for (let col = 0 ; col < octopuses[0].length ; col++) {
        const octopus = `${row},${col}`
        if (octopuses[row][col] > 9 && !flashed_set.has(octopus)) {
          flashed = true;
          flashed_set.add(octopus)
          flash(row, col, octopuses)
          flashedcount++
        }
      }
    }
  }

  for (let row = 0 ; row < octopuses.length ; row++) {
    for (let col = 0 ; col < octopuses[0].length ; col++) {
      if (octopuses[row][col] > 9)
        octopuses[row][col] = 0;
    }
  }

  return flashedcount;
}

function flash(row, col, octopuses) {
  if (row > 0) {
    if (col > 0)
      octopuses[row-1][col-1]++

    octopuses[row-1][col]++;

    if (col < octopuses[0].length - 1)
      octopuses[row-1][col+1]++
  }

  if (col > 0)
    octopuses[row][col-1]++;
  if (col < octopuses[0].length - 1)
    octopuses[row][col+1]++;

  if (row < octopuses.length - 1) {
    if (col > 0)
      octopuses[row+1][col-1]++;

    octopuses[row+1][col]++;

    if (col < octopuses[0].length - 1)
      octopuses[row+1][col+1]++;
  }
}

console.log(part1());
console.log(part2());
