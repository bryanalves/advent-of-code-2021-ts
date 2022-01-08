import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc9.txt', 'utf8');
//   const input = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// `;

  return input.split('\n').slice(0, -1).map(i => i.split('').map(j => parseInt(j)))
}

function part1() {
  const map = parsedInput();

  return lowpoints(map).map(i => map[i[0]][i[1]]).reduce((a,b) => a + b +1, 0);
}

function lowpoints(map) {
  const row_len = map.length
  const col_len = map[0].length
  const retval = []

  for (let row = 0 ; row < row_len ; row++) {
    for (let col = 0 ; col < col_len ; col++) {
      if (checkPoint(row, col, map))
        retval.push([row, col])
    }
  }

  return retval;
}

function part2() {
  const map = parsedInput();
  
  const basinSizes = lowpoints(map).map(lp => {
    const basin = new Set([`${[lp[0]},${lp[1]}`])
    buildBasin(lp[0], lp[1], basin, map)
    return basin.size
  });

  return basinSizes.sort((a,b) => b - a).slice(0, 3).reduce((a,b) => a*b, 1)
}

function buildBasin(row, col, basin, map) {
  const row_len = map.length
  const col_len = map[0].length

  // up
  for (let i = row - 1 ; i >= 0 ; i--) {
    if (map[i][col] == 9) break;
    const p = `${i},${col}`
    if (basin.has(p)) continue
    basin.add(p)
    buildBasin(i, col, basin, map);
  }

  //down
  for (let i = row + 1 ; i < row_len ; i++) {
    if (map[i][col] == 9) break;
    const p = `${i},${col}`
    if (basin.has(p)) continue
    basin.add(p)
    buildBasin(i, col, basin, map);
  }

  //left
  for (let i = col - 1 ; i >= 0 ; i--) {
    if (map[row][i] == 9) break;
    const p = `${row},${i}`
    if (basin.has(p)) continue
    basin.add(p)
    buildBasin(row, i, basin, map);
  }

  //right
  for (let i = col + 1 ; i < col_len ; i++) {
    if (map[row][i] == 9) break;
    const p = `${row},${i}`
    if (basin.has(p)) continue
    basin.add(`${row},${i}`)
    buildBasin(row, i, basin, map);
  }
}

function checkPoint(row, col, map) {
  const row_len = map.length
  const col_len = map[0].length
  const val = map[row][col];

  let up = (row == 0)                ? true : val < map[row-1][col]
  let down = (row == (row_len - 1))  ? true : val < map[row+1][col]
  let left = (col == 0)              ? true : val < map[row][col-1]
  let right = (col == (col_len - 1)) ? true : val < map[row][col+1]

  return (up && down && left && right)
}

console.log(part1());
console.log(part2());
