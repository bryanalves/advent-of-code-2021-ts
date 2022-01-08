import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc20.txt', 'utf8');
//   const input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#
//
// #..#.
// #....
// ##..#
// ..#..
// ..###
// `;

  const map = input.split('\n').slice(0, 1)[0]
  const image = input.split('\n').slice(2, -1)

  return [map, image]
}

function part1() {
  const [map, origimage] = parsedInput()
  let todo = origimage

  for (let i = 0 ; i < 2 ; i++) {
    const padchar = i & 1 ? map[0] : map[511]
    todo = enhance(todo, map, padchar)
  }

  printImage(todo)

  const lengthsperrow = todo.map(row => row.split('').filter(v => v == '#').length)
  return lengthsperrow.reduce((a,b) => a + b, 0)
}

function printImage(image) {
  image.forEach(row => console.log(row))
}

function enhance(image, map, padchar = '.') {
  const retval = []

  for (let row = -2 ; row < image.length + 2 ; row++) {
    retval.push([])
    for (let col = -2 ; col < image[0].length + 2 ; col++) {
      const binary_p = extractPoint(image, [row, col])
      //retval.at(-1).push(map[binary_p])

      if ((row <= -1 || row >= image.length || col <= -1 || col >= image[0].length) && binary_p == 0) {
        retval.at(-1).push('.')
      } else {
        retval.at(-1).push(map[binary_p])
      }
    }
  }

  return retval.map(row => row.join(''))
}

function extractPoint(image, coords, padchar = '.') {
  const [row, col] = coords
  const retval = []

  for (let i = -1 ; i <= 1 ; i++) {
    retval.push([])

    for (let j = -1 ; j <= 1 ; j++) {
      const targetrow = row + i
      const targetcol = col + j
      if (targetrow >=0 && targetrow < image.length && targetcol >=0 && targetcol < image[0].length) {
        retval.push(image[targetrow][targetcol])
      } else {
        retval.push(padchar)
      }
    }
  }

  const binary = retval.join('').replaceAll('.', '0').replaceAll('#', '1')
  return parseInt(binary, 2)
}

console.log(part1())
