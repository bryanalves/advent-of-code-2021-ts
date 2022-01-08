
import fs from 'fs';

function parsedInput(): string[] {
  const input: string = fs.readFileSync('./res/aoc5.txt', 'utf8');
//   const input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2
// `;

  return input.split("\n").slice(0, -1);
}

function part1() {
  const lines = parsedInput();
  const map = []

  for (const line of lines) {
    const [col1, row1, col2, row2] = points(line);

    if (col1 == col2) {
      drawVerticalLine(row1, row2, col1, map)
    } else if (row1 == row2) {
      drawHorizontalLine(col1, col2, row1, map);
    }
  }

  return scoreMap(map);
}

function part2() {
  const lines = parsedInput();
  const map = []

  for (const line of lines) {
    const [col1, row1, col2, row2] = points(line);

    if (col1 == col2) {
      drawVerticalLine(row1, row2, col1, map)
    } else if (row1 == row2) {
      drawHorizontalLine(col1, col2, row1, map);
    } else {
      drawDiagonalLine(col1, row1, col2, row2, map);
    }
  }

  return scoreMap(map);
}

function scoreMap(map) {
  return map.reduce((a, row) => {
    return a + row.filter(i => parseInt(i) >= 2).length
  }, 0)
}

function drawVerticalLine(row1, row2, col, map) {
  const min_row = (row1 < row2) ? row1 : row2
  const max_row = (row1 > row2) ? row1 : row2

  for (let i = min_row ; i <= max_row ; i++) {
    if (map[i] == undefined) map[i] = [];
    if (map[i][col] === undefined) map[i][col] = 0;
    map[i][col]++;
  }
}

function drawHorizontalLine(col1, col2, row, map) {
  const min_col = (col1 < col2) ? col1 : col2
  const max_col = (col1 > col2) ? col1 : col2

  if (map[row] === undefined) map[row] = [];

  for (let i = min_col ; i <= max_col ; i++) {
    if (map[row][i] === undefined) map[row][i] = 0;
    map[row][i]++;
  }
}

function drawDiagonalLine(col1, row1, col2, row2, map) {
  const length = Math.abs(col1 - col2);

  for (let i = 0 ; i <= length ; i++) {
    let col = 0;
    if (col1 < col2)
      col = col1 + i;
    else
      col = col1 - i;

    let row = 0;
    if (row1 < row2)
      row = row1 + i;
    else
      row = row1 - i;

    if (map[row] === undefined) map[row] = [];
    if (map[row][col] === undefined) map[row][col] = 0;
    map[row][col]++;
  }
}

function points(line) {
  const [point1, point2] = line.split(' -> ')
  const [x1, y1] = point1.split(',').map(i => parseInt(i))
  const [x2, y2] = point2.split(',').map(i => parseInt(i))

  return [x1, y1, x2, y2]
}

//console.log(part1());
console.log(part2());
