import fs from 'fs';

function parsedInput(): number[] {
  const input: string = fs.readFileSync('./res/aoc8.txt', 'utf8');
//   const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
// `;
  return input.split("\n").slice(0, -1).map(line => line.split(" | ").map(elem => elem.split(" ")));
}

function part1() {
  const segmap = {
    0: 6,
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6
  }

  const vals = parsedInput();
  const outputs = vals.map(v => v[1])
  const uniques = outputs.reduce((init, valset) => {
    return init + valset.filter((v) => {
      return v.length == segmap[1] ||
        v.length == segmap[4] ||
        v.length == segmap[7] ||
        v.length == segmap[8]
    }).length
  }, 0);

  return uniques;
}

function part2() {
  const vals = parsedInput();
  const nums = vals.map(v => solveRow(v))
  return nums.reduce((a, b) => a + b, 0)
}

function solveRow(row) {
  const input = row[0].map(elem => elem.split('').sort());
  const outputs = row[1];

  const one = input.filter(num => {
    return num.length == 2
  })[0]

  const four = input.filter(num => {
    return num.length == 4
  })[0]

  const seven = input.filter(num => {
    return num.length == 3
  })[0]

  const eight = input.filter(num => {
    return num.length == 7
  })[0]

  const nine = input.filter(num => {
    const matchset = new Set([...four, ...seven])
    const difference = new Set(
    [...num].filter(x => !matchset.has(x)));
    return num.length == 6 && difference.size == 1
  })[0]

  const six = input.filter(num => {
    const matchset = new Set([...num])
    const difference = new Set(
      [...one].filter(x => !matchset.has(x)));
    return num.length == 6 && difference.size == 1
  })[0]

  const zero = input.filter(num => {
    return num.length == 6 && num != six && num != nine
  })[0]

  const five = input.filter(num => {
    const matchset = new Set([...num])
    const difference = new Set(
      [...six].filter(x => !matchset.has(x)));
    return num.length == 5 && difference.size == 1
  })[0]

  const three = input.filter(num => {
    const matchset = new Set([...nine])
    const difference = new Set(
      [...num].filter(x => !matchset.has(x)));

    const matchset2 = new Set([...num])
    const difference2 = new Set(
      [...nine].filter(x => !matchset2.has(x)));

    return num.length == 5 && num != five && difference.size == 0 && difference2.size == 1
  })[0]

  const two = input.filter(num => {
    return num.length == 5 && num != three && num != five
  })[0]

  const set = [ zero, one, two, three, four, five, six, seven, eight, nine ].map(i => i.join(''))

  const retval = outputs.map(out => {
    const sorted = out.split('').sort().join('')
    return set.indexOf(sorted)
  })

  return parseInt(retval.join(''))
}

console.log(part1());
console.log(part2());
