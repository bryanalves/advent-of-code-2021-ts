import fs from 'fs';

function parsedInput() {
  // const input: string = fs.readFileSync('./res/aoc17.txt', 'utf8');
  // const input = `[[[[4,3],4],4],[7,[[8,4],9]]]
  //   [1,1]
  // `

  const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`

return input.split('\n').slice(0,-1).map(eval)
}

function part1() {
  const snailfish = parsedInput()
  //const final = snailfish.reduce((a,b) => add(a, b))

  let final = make_tree(snailfish[0])
  snailfish.slice(1).forEach(sf => {
    const right = make_tree(sf)
    const main = {l: final, r: right}
    final.parent = main
    right.parent = main
    final = main
  })

  write_tree(final)
  reduce(final)
  // write_tree(final)
  // console.log(magnitude(final))
}

function magnitude(snailfish) {
  let [l, r] = [snailfish.l, snailfish.r]
  console.log(l, r)

  if (typeof l === 'object')
    l = magnitude(l)
  if (typeof r === 'object')
    r = magnitude(r)

  return 3*l + 2*r
}

function add(t1, t2) {
  const n = {l: t1, r: t2}
  t1.parent = n
  t2.parent = n
  return n
}

function write_tree(tree) {
  if (typeof tree.l === 'number')
    process.stdout.write(` ${tree.l} `)
  else
    write_tree(tree.l)

  if (typeof tree.r === 'number')
    process.stdout.write(` ${tree.r} `)
  else
    write_tree(tree.r)

}

function reduce(snailfish) {
  let exploded = false

  while(true) {
    write_tree(snailfish);
    console.log();

    [snailfish, exploded] = explode(snailfish)
    if (exploded) continue;

    const did_split = split(snailfish)
    if (did_split) continue;

    if (!did_split && !exploded) return;
  }
}

function explode(snailfish, depth=0) {
  let l = snailfish.l
  let r = snailfish.r
  let exploded = false;

  if (typeof l === 'object')
    [l, exploded] = explode(l, depth + 1)

  if (!exploded && typeof r === 'object')
    [r, exploded] = explode(r, depth + 1)

  if (depth == 4) {
    distribute_left(snailfish.parent, l)
    distribute_right(snailfish, r)
    if (snailfish.parent.l == snailfish) {
      snailfish.parent.l = 0
    } else {
      snailfish.parent.r = 0
    }
    exploded = true
  }

  return [snailfish, exploded]
}

function distribute_left(t, n) {
  if (typeof(t.l) == 'number') {
    t.l += n
    return
  }

  if (!t.parent) return;

  while (t.parent.l == t) {
    if (!t.parent) return;
    t = t.parent
    if (!t.parent) return;
  }

  t = t.parent

  if (typeof(t.l) == 'number') {
    t.l += n
    return
  }

  t = t.l
  while (true) {
    if (typeof(t.r) == 'number') {
      t.r += n
      return
    }

    t = t.r
  }
}

function distribute_right(t, n) {
  if (!t.parent) return;
  while (t.parent.r == t) {
    if (!t.parent) return;
    t = t.parent
    if (!t.parent) return;
  }

  if (typeof(t.parent.r) == 'number') {
    t.parent.r += n
    return
  }

  t = t.parent.r

  while(true) {
    if (typeof(t.l) == 'number') {
      t.l += n
      return
    }

    t = t.l
  }
}

function split(snailfish) {
  if (typeof(snailfish.l) == 'number') {
    if (snailfish.l >= 10) {
      const a = Math.floor(snailfish.l/2)
      const b = Math.ceil(snailfish.l/2)
      snailfish.l = {l: a, r: b}
      snailfish.l.parent = snailfish

      return true
    }
  } else if (split(snailfish.l)) {
    return true
  }

  if (typeof(snailfish.r) == 'number') {
    if (snailfish.r >= 10) {
      const a = Math.floor(snailfish.r/2)
      const b = Math.ceil(snailfish.r/2)

      snailfish.r = {l: a, r: b}
      snailfish.r.parent = snailfish

      return true
    }
  } else if (split(snailfish.r)) {
    return true
  }

  return false
}

function make_tree(snailfish) {
  let [l, r] = snailfish

  if (Array.isArray(l)) {
    l = make_tree(l)
  }

  if (Array.isArray(r)) {
    r = make_tree(r)
  }

  const n = {l: l, r: r}

  if (typeof l === 'object')
    l.parent = n

  if (typeof r === 'object')
    r.parent = n

  return n
}

console.log(part1());
