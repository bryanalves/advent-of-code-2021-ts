import fs from 'fs';

function parsedInput(): string[] {
  const input: string = fs.readFileSync('./res/aoc4.txt', 'utf8');
//   const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
// 
// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19
// 
//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6
// 
// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7
// `;

  return input.split("\n").slice(0, -1);
}

function part1() {
  const [numbers, boards] = parse()
  for (const num of numbers) {
    markNumber(num, boards);
    for (let board = 0 ; board < boards.length ; board++) {
      if (checkBoard(boards[board]) {
        return scoreBoard(num, boards[board]);
      }
    }
  }
}

function part2() {
  const [numbers, boards] = parse()
  let winningBoards = new Set();
  
  for (const num of numbers) {
    markNumber(num, boards);
    for (let board = 0 ; board < boards.length ; board++) {
      if (winningBoards.has(board)) continue;
      if (checkBoard(boards[board])) winningBoards.add(board);
      if (winningBoards.size == boards.length) {
        return scoreBoard(num, boards[board]);
      }
    }
  }
}

function parse() {
  const parsed = parsedInput();
  const numbers = parsed[0].split(',');
  const boards = arrChunks(parsed.slice(2), 6)
    .map(board => board.slice(0, 5))
    .map(board => board.map(row => row.replaceAll('  ', ' ')
                                      .split(' ')
                                      .filter(i => i != '')
                                      .map(i => [i, false])
                           ))
    ;

    return [numbers, boards];
}

function markNumber(num, boards) {
  for (let b = 0 ; b < boards.length ; b++) {
    for (let row = 0 ; row < 5 ; row++) {
      for (let i = 0 ; i < 5 ; i++) {
        if (boards[b][row][i][0] == num) {
          boards[b][row][i][1] = true;
        }
      }
    }
  }
}

function checkBoard(board) {
  for (let row = 0 ; row < 5 ; row++) {
    const c = board[row].filter(i => i[1] == true).length;
    if (c == 5) return true;
  }

  for (let col = 0 ; col < 5 ; col++) {
    if (board[0][col][1] == true &&
        board[1][col][1] == true &&
        board[2][col][1] == true &&
        board[3][col][1] == true &&
        board[4][col][1] == true)
      return true;
  }

  return false;
}

function scoreBoard(num, board) {
  let retval = 0;
  for (let row = 0 ; row < 5 ; row++) {
    for (let col = 0 ; col < 5 ; col++) {
      const val = board[row][col]
      if (val[1] == false) retval += parseInt(val[0])
    }
  }

  retval *= parseInt(num);
  return retval;
}

function arrChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
console.log(part1());
console.log(part2());
