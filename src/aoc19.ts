import fs from 'fs';

function parsedInput() {
  // const input: string = fs.readFileSync('./res/aoc19.txt', 'utf8');
  const input = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14
`

  const scanners = []
  input.split('\n').slice(0, -1).forEach(line => {
    if (line.startsWith('---')) {
      scanners.push([])
      return
    }

    if (line.length == 0) {
      return
    }

    const points = line.split(',').map(i => parseInt(i))
    scanners[scanners.length - 1].push(points)
  });

  return scanners
}

const permutationmap = {}
const distances = {}

function part1() {
  const scanners = parsedInput().map(scanner => permutations(scanner));

  for (let i = 0 ; i < scanners.length ; i++) {
    for (let j = 0 ; j < scanners.length ; j++) {
      if (i == j) continue;
      scannerDistance(i, j, scanners)
    }
  }

  console.log('normalizing')
  const normalized = normalizeDistances(scanners.length)
  console.log(normalized)

  const beacons = []
  for (let i = 0 ; i < scanners.length ; i++) {
    const permutation = permutationmap[i]
    const distanceadjust = normalized[i]
    scanners[i][permutation].forEach(beacon => {
      beacons.push([
        beacon[0] + distanceadjust[0],
        beacon[1] + distanceadjust[1],
        beacon[2] + distanceadjust[2],
      ])
    }
  }

  const beaconSet = new Set(beacons.map(b => `${b[0]},${b[1]},${b[2]}`))

  return beaconSet.size;
}

function normalizeDistances(numscanners) {
  const retval = []
  retval[0] = [0,0,0]

  console.log(distances)
  while(retval.filter(r => r !== undefined).length < numscanners) {
    for (let target = 0 ; target < numscanners ; target++) {
      for (const key in distances) {
        const scanners = key.split(',')
        if (scanners[0] == target && retval[target] !== undefined) {
          const other = scanners[1]
          retval[other] = [
            retval[target][0] + distances[key][0],
            retval[target][1] + distances[key][1],
            retval[target][2] + distances[key][2],
          ]
        }
      }
    }
  }

  return retval;
}

function scannerDistance(first, second, scanners) {
  for (let i = 0 ; i < 24 ; i++) {
    if (permutationmap[first] !== undefined) {
      if (permutationmap[first] !== i) continue;
    }

    for (let j = 0 ; j < 24 ; j++) {
      if (permutationmap[second] !== undefined) {
        if (permutationmap[second] !== j) continue;
      }

      const dist = scannerMatch(scanners[first][i], scanners[second][j])

      if (dist !== false) {
        permutationmap[first] = i;
        permutationmap[second] = j;
        distances[`${first},${second}`] = dist
      }
    }
  }
}

function scannerMatch(s1p, s2p) {
  const vals = {}
  for (let i = 0 ; i < s1p.length ; i++) {
    for (let j = 0 ; j < s2p.length ; j++) {
      const diffx = s1p[i][0] - s2p[j][0]
      const diffy = s1p[i][1] - s2p[j][1]
      const diffz = s1p[i][2] - s2p[j][2]
      const diffstring = `${diffx},${diffy},${diffz}`
      if (vals[diffstring] == undefined) vals[diffstring] = 0
      vals[diffstring]++
    }
  }

  for (const key in vals) {
    if (vals[key] >= 12) return key.split(',').map(i => parseInt(i))
  }

  return false
}

function permutations(scanner) {
  const retval = []

  retval.push(scanner)
  const orientations = [
    [-1, 1, 1],
    [1, -1, 1],
    [1, 1, -1],
  ]

  orientations.forEach(o => {
    retval.push(scanner.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  //swap 102
  const swap1 = scanner.map(b => [b[1], b[0], b[2]])
  retval.push(swap1)
  orientations.forEach(o => {
    retval.push(swap1.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  //swap 210
  const swap2 = scanner.map(b => [b[2], b[1], b[0]])
  retval.push(swap2)
  orientations.forEach(o => {
    retval.push(swap2.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  //swap 021
  const swap3 = scanner.map(b => [b[0], b[2], b[1]])
  retval.push(swap3)
  orientations.forEach(o => {
    retval.push(swap3.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  //swap 120
  const swap4 = scanner.map(b => [b[1], b[2], b[0]])
  retval.push(swap4)
  orientations.forEach(o => {
    retval.push(swap4.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  //swap 201
  const swap5 = scanner.map(b => [b[2], b[0], b[1]])
  retval.push(swap5)
  orientations.forEach(o => {
    retval.push(swap5.map(b => [b[0] * o[0], b[1] * o[1], b[2] * o[2]]))
  }

  return retval;
}

console.log(part1())
