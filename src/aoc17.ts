import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc17.txt', 'utf8');
  // const input = `target area: x=20..30, y=-10..-5
  // `;

  const line = input.split('\n').slice(0, -1)[0]
  const coords = line.split(': ')[1]
  const [x, y] = coords.split(', ')
  const [min_x, max_x] = x.slice(2).split('..')
  const [min_y, max_y] = y.slice(2).split('..')

  return [parseInt(min_x), parseInt(max_x), parseInt(min_y), parseInt(max_y)]
}

function part1() {
  const target = parsedInput();
  let vals = []
  for (let x = 0 ; x <= target[1] ; x++) {
    for (let y = 0 ; y <= Math.abs(target[2]) ; y++) {
      const val = simulate([0, 0, x, y], target) 
      if (val) vals.push(val);
    }
  }

  return Math.max(...vals)
}

function part2() {
  const target = parsedInput();
  let retval = 0;
  for (let x = 0 ; x <= target[1] ; x++) {
    for (let y = target[2] ; y <= Math.abs(target[2]) ; y++) {
      const val = simulate([0, 0, x, y], target)
      if (val != null) retval++;
    }
  }

  return retval;
}

function simulate(data, target) {
  let max_y = 0
  while(true) {
    data = step(data)
    max_y = Math.max(max_y, data[1])
    if (inTarget(data, target)) return max_y;
    if (pastTarget(data, target)) return null;
  }
}

function inTarget(data, target) {
  const x = data[0]
  const y = data[1]

  return x >= target[0] && x <= target[1] && y >= target[2] && y <= target[3]
}

function pastTarget(data, target) {
  const x = data[0]
  const y = data[1]

  return x > target[1] || y < target[2]
}

function step(step_data) {
  let [x, y, x_vel, y_vel] = step_data
  x += x_vel
  y += y_vel

  if (x_vel > 0) {
    x_vel--;
  } else if (x < 0) {
    x_vel++;
  }

  y_vel--;

  return [x, y, x_vel, y_vel]
}

console.log(part1())
console.log(part2())
