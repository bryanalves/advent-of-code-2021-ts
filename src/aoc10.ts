import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc10.txt', 'utf8');
  // const input = `{([(<{}[<>[]}>{[]{[(<()>
 // `;
//   const input = `[({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]
// `;

  return input.split('\n').slice(0, -1).map(i => i.split(''))
}

function part1() {
  const lines = parsedInput();
  let score = 0;

  for (const line of lines) {
    const error = parseLine(line);
    switch (error) {
      case ')': {
        score += 3;
        break;
      }
      case ']': {
        score += 57
        break;
      }

      case '}': {
        score += 1197
        break;
      }

      case '>': {
        score += 25137
        break
      }
    }
  }

  return score
}

function part2() {
  const lines = parsedInput();
  let scores = [];

  for (const line of lines) {
    const error = parseLine(line);
    if (!Array.isArray(error)) continue;
    let score = 0
    while (error.length > 0) {
      score *= 5
      const err = error.pop()
      switch (err) {
        case '(': {
          score += 1;
          break;
        }

        case '[': {
          score += 2;
          break;
        }

        case '{': {
          score += 3;
          break;
        }

        case '<': {
          score += 4;
          break;
        }
      }
    }

    scores.push(score);
  }

  return scores.sort((a,b) => a - b)[Math.floor(scores.length / 2)]
}

function parseLine(line) {
  let stack = [];

  for (const char of line) {
    switch (char) {
      case '(': {
        stack.push(char);
        break;
      }

      case '[': {
        stack.push(char);
        break;
      }

      case '{': {
        stack.push(char);
        break;
      }

      case '<': {
        stack.push(char);
        break;
      }

      //

      case ')': {
        const match = stack.pop()
        if (match !== '(') return char; 
        break;
      }

      case ']': {
        const match = stack.pop()
        if (match !== '[') return char; 
        break;
      }

      case '}': {
        const match = stack.pop()
        if (match !== '{') return char; 
        break;
      }

      case '>': {
        const match = stack.pop()
        if (match !== '<') return char; 
        break;
      }
    }
  }

  return stack
}

console.log(part1());
console.log(part2());
