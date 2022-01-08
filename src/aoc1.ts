import fs from 'fs';

function parsedInput(): number[] {
  const input: string = fs.readFileSync('./res/aoc1.txt', 'utf8');
//   const input = `199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263`;

  return input.split("\n").map((i) => parseInt(i));
}

function part1() {
  const parsed = parsedInput();
  return parsed.reduce((a, b) => (b > a[1]) ? [a[0] + 1, b] : [a[0], b], [0, +Infinity])[0];
}

function part2() {
  const parsed = parsedInput();
  return slidingWindows(parsed, 3).reduce((a, b) => {
    const newsum = b[0] + b[1] + b[2];
    if (newsum > a[1]) 
      return [a[0] + 1, newsum];
    else
      return [a[0], newsum];
  }, [0, +Infinity])[0];
  
}

function slidingWindows(inputArray: any[], size: number): any[] {
  return Array.from(
    {length: inputArray.length - (size - 1)}, //get the appropriate length
    (_, index) => inputArray.slice(index, index+size) //create the windows
  )
}

console.log(part1());
console.log(part2());
