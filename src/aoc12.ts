import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc12.txt', 'utf8');
//   const input = `start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end
// `

//   const input = `dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc
// `;

//   const input = `fs-end
// he-DX
// fs-he
// start-DX
// pj-DX
// end-zg
// zg-sl
// zg-pj
// pj-he
// RW-he
// fs-DX
// pj-RW
// zg-RW
// start-pj
// he-WI
// zg-he
// pj-fs
// start-RW
// `;

  return input.split('\n').slice(0, -1).map(i => i.split('-'))
}

function part1() {
  const connections = parsedInput();
  const map = {}
  connections.forEach(c => {
    const a = c[0]
    const b = c[1]

    if (map[a] == undefined) map[a] = [];
    if (map[b] == undefined) map[b] = [];
    map[a].push(b)
    map[b].push(a)
  })

  const retval = countPathsFromPoint('start', map, [])

  return retval;
}

function part2() {
  const connections = parsedInput();
  const map = {}
  connections.forEach(c => {
    const a = c[0]
    const b = c[1]

    if (map[a] == undefined) map[a] = [];
    if (map[b] == undefined) map[b] = [];
    map[a].push(b)
    map[b].push(a)
  })

  const retval = countPathsFromPoint2('start', map, ['start'])

  return retval;
}

function countPathsFromPoint(start, map, cur_path) {
  let retval = 0;

  map[start].forEach(p => {
    const visited = [...cur_path]
    if (p == 'start') {
      // do nothing
    } else if (p == 'end') {
      retval++;
    } else if (p == p.toLowerCase()) { 
      if (!cur_path.includes(p)) {
        visited.push(p)
        retval += countPathsFromPoint(p, map, visited)
      }
    } else {
      visited.push(p)
      retval += countPathsFromPoint(p, map, visited)
    }
  }

  return retval;
}

function countPathsFromPoint2(start, map, cur_path) {
  let retval = 0;

  map[start].forEach(p => {
    const visited = [...cur_path]
    if (p == 'start') {
      // do nothing
    } else if (p == 'end') {
      retval++;
    } else if (p == p.toLowerCase()) { 
      if (canVisitSmallCave(p, visited)) {
        visited.push(p)
        retval += countPathsFromPoint2(p, map, visited)
      }
    } else {
      visited.push(p)
      retval += countPathsFromPoint2(p, map, visited)
    }
  }

  return retval;
}

function canVisitSmallCave(cave, cur_path) {
  const small_visited = {}
  cur_path.forEach(p => {
    if (p !== p.toLowerCase()) return;
    if (small_visited[p] == undefined) small_visited[p] = 0;
    small_visited[p]++;
  })

  if (small_visited[cave] == undefined) small_visited[cave] = 0;
  small_visited[cave]++;

  let twice = false;
  for (let key in small_visited) {
    let value = small_visited[key];
    if (value == 2) {
      if (twice) {
        return false;
      } else {
        twice = true;
      }
    }

    if (value > 2) return false;

  }

  return true;
}

console.log(part1())
console.log(part2())
