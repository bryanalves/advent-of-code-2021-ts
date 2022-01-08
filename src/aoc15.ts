import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc15.txt', 'utf8');
//   const input = `1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581
// `;

  return input.split('\n').slice(0, -1).map(i => i.split('').map(j => parseInt(j)))
}

function part1() {
  const map = parsedInput()
  const scores = bestpath(map)

  const max_row = map.length
  const max_col = map[0].length
  const target = `${max_row - 1},${max_col - 1}`

  return scores[target]
}

function part2() {
  const map = quintuplemap(parsedInput())
  const scores = bestpath(map)

  const max_row = map.length
  const max_col = map[0].length
  const target = `${max_row - 1},${max_col - 1}`

  return scores[target]
}

function quintuplemap(map) {
  const max_row = map.length
  const max_col = map[0].length

  for (let rowq = 0 ; rowq < 5 ; rowq++) {
    for (let colq = 0 ; colq < 5 ; colq++) {
      for (let row = 0 ; row < max_row ; row++) {
        for (let col = 0 ; col < max_col ; col++) {
          const targetrow = (max_row * rowq) + row
          const targetcol = (max_col * colq) + col
          let targetval = map[row][col] + rowq + colq
          targetval = targetval > 9 ? targetval - 9: targetval

          map[targetrow] = (map[targetrow] == undefined) ? [] : map[targetrow]
          map[targetrow][targetcol] = targetval
        }
      }
    }
  }

  return map
}

function bestpath(map) {
  const max_row = map.length
  const max_col = map[0].length
  const target = `${max_row - 1},${max_col - 1}`

  const scores = {}
  const todo = [[0, 0, 0]]
  scores['0,0'] = 0

  while (scores[target] == undefined) {
    const [risk, row, col] = todo.shift()
    const candidates = navcandidates(row, col, map)
    candidates.filter(c => scores[c] == undefined).forEach(c => {
      const [crow, ccol] = c.split(',').map(i => parseInt(i))

      scores[c] = scores[c] ? scores[c] : Infinity
      scores[c] = Math.min(risk + map[crow][ccol], scores[c])

      todo.push([scores[c], crow, ccol])

      todo = todo.sort((a,b) => a[0] - b[0])
    })
  }

  return scores;
}

function navcandidates(row, col, map) {
  const candidates = []

  if (row > 0) {
    candidates.push(`${row-1},${col}`)
  }

  if (col > 0) {
    candidates.push(`${row},${col-1}`)
  }

  if (col < map[0].length - 1) {
    candidates.push(`${row},${col+1}`)
  }

  if (row < map.length - 1) {
    candidates.push(`${row+1},${col}`)
  }

  return candidates
}

console.log(part1())
console.log(part2())
