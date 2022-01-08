import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc13.txt', 'utf8');
//   const input = `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0
// 
// fold along y=7
// fold along x=5
// `

  const [grid, instructions] = input.split('\n')
    .slice(0, -1).reduce((result, element) => {
      if (element == '') return result;
      if (element.slice(0, 4) == 'fold') {
        result[1].push(element.split(' ')[2].split('='))
      } else {
        result[0].push(element.split(',').map(i => parseInt(i))
      }

      return result
    }, [ [], [] ]);

    return [grid, instructions]
}


function part1() {
  let [grid, instructions] = parsedInput()

  instructions.slice(0, 1).forEach(instruction => {
    if (instruction[0] == 'y') {
      grid = foldVertical(grid, parseInt(instruction[1]));
    } else {
      grid = foldHorizontal(grid, parseInt(instruction[1]));
    }
  })

  return new Set(grid.map(p => `${p[0]},${p[1]}`)).size;
}

function part2() {
  let [grid, instructions] = parsedInput()

  instructions.forEach(instruction => {
    if (instruction[0] == 'y') {
      grid = foldVertical(grid, parseInt(instruction[1]));
    } else {
      grid = foldHorizontal(grid, parseInt(instruction[1]));
    }
  })

  let max_x = 0;
  let max_y = 0;

  grid.forEach(p => {
    if (p[0] > max_x) max_x = p[0]
    if (p[1] > max_y) max_y = p[1]
  })

  const gridset = new Set(grid.map(p => `${p[0]},${p[1]}`))

  for (let y = 0 ; y <= max_y ; y++) {
    for (let x = 0 ; x <= max_x ; x++) {
      if (gridset.has(`${x},${y}`)) {
        process.stdout.write('#')
      } else {
        process.stdout.write('-')
      }
    }
    process.stdout.write("\n");
  }
}

function foldVertical(grid, height) {
  const newPoints = grid.filter(p => p[1] > height).map(p => {
    const diff = p[1] - height
    const newPoint = [p[0], height - diff] 
    return newPoint
  })

  newPoints.forEach(p => grid.push(p))
  return grid.filter(p => p[1] < height)
}

function foldHorizontal(grid, width) {
  const newPoints = grid.filter(p => p[0] > width).map(p => {
    const diff = p[0] - width
    const newPoint = [width - diff, p[1]] 
    return newPoint
  })

  newPoints.forEach(p => grid.push(p))
  return grid.filter(p => p[0] < width)
}

console.log(part1());
part2();
