import fs from 'fs';

function parsedInput() {
  const input: string = fs.readFileSync('./res/aoc16.txt', 'utf8');
  // const input = `04005AC33890
  // `
  // const input = `38006F45291200
  // `;

  // const input = `EE00D40C823060
  // `;

  return input.slice(0, -1)
}

function part1() {
  const input = hextobin(parsedInput());
  const packet = buildPacket(input)
  return sumVersions(packet);
}

function part2() {
  const input = hextobin(parsedInput());
  const packet = buildPacket(input)
  return packetValue(packet);
}

function sumVersions(packet) {
  const subVersions = packet.subpackets.map(packet => sumVersions(packet))

  return packet.version + subVersions.reduce((a,b) => a + b, 0)
}

function packetValue(packet) {
  const vals = packet.subpackets.map(p => packetValue(p))

  switch (packet.type) {
    case 0: {
      const val = vals.reduce((a,b) => a + b, 0)
      return val
    }

    case 1: {
      const val = vals.reduce((a,b) => a * b, 1)
      return val
    }

    case 2: {
      const val = Math.min(...vals)
      return val
    }

    case 3: {
      const val = Math.max(...vals)
      return val
    }

    case 4: {
      return packet.val
    }

    case 5:{
      if (vals[0] > vals[1])
        return 1
      else
        return 0
    }

    case 6: {
      if (vals[0] < vals[1])
        return 1
      else
        return 0
    }

    case 7: {
      if (vals[0] == vals[1])
        return 1
      else
        return 0
    }
  }
}

function buildPacket(input) {
  const version = parseInt(input.slice(0, 3), 2)
  const type = parseInt(input.slice(3, 6), 2)
  let remainder = input.slice(6)
  let body = null;
  let val = null;
  let subpackets = [];

  switch (type) {
    case 4: {
      body = extractNumber(remainder)
      val = body.val
      remainder = body.remainder
      break;
    }

    default: {
      body = extractOperator(remainder)
      remainder = body.remainder
      if (body.lengthtype == '0') {
        let consumedbits = 0
        while (consumedbits < body.length) {
          const packet = buildPacket(remainder)
          subpackets.push(packet)
          consumedbits += remainder.length - packet.remainder.length
          remainder = packet.remainder
        }
      } else {
        for (let i = 0 ; i < body.length ; i++) {
          const packet = buildPacket(remainder)
          subpackets.push(packet)
          remainder = packet.remainder
        }
      }

      break;
    }
  }

  return {version: version,
          type: type,
          val: val,
          remainder: remainder,
          subpackets: subpackets
  }
}

function extractOperator(input) {
  const lengthtype = input.slice(0, 1)
  let length;

  if (lengthtype == '0') { //bits
    length = parseInt(input.slice(1, 16), 2)
    input = input.slice(16)
  } else { //numpackets
    length = parseInt(input.slice(1, 12), 2)
    input = input.slice(12)
  }

  return {lengthtype: lengthtype,
          length: length,
          remainder: input }
}

function extractNumber(input) {
  const bits = []
  let keepgoing = true

  while(keepgoing) {
    const cur = input.slice(0, 5)
    input = input.slice(5)
    if (cur[0] == '0') keepgoing = false;
    bits.push(cur.slice(1))
  }

  // let truncate = 8 - ((bits.length * 5) + 6) % 8
  // return [parseInt(bits.join(''), 2), input.slice(truncate)];

  return {val: parseInt(bits.join(''), 2),
          remainder: input};
}

function hextobin(input) {
  //return parseInt(input, 16).toString(2)

  return input.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

console.log(part1())
console.log(part2())
