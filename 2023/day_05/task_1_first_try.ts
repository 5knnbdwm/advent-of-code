// const {default: data} = require('./file_input.txt');
const {default: data} = require('./file_test.txt');

type Mapping = Map<string, string>

const makeMaps = (group: string): Mapping => {
  const lines = group.split('\n');
  lines.shift();

  let a: Map<string, string> = new Map()

  for (const line of lines) {
    const [destStart, sourceStart, length] = line.split(' ').map(Number);

    for (let i = 0; i < length; i++) {
      a.set((sourceStart + i).toString(), (destStart + i).toString());
    }
  }

  return a
}

const transform = (map: Mapping, value: number): string => {
  return map.get(value.toString()) ?? value.toString()
}

export default function run() {
  const groups = data.split('\n\n');
  let seeds = groups[0].split(': ')[1].split(' ').map(Number)
  let result = -1



  // const seedToSoilMap = makeMaps(groups[1])
  // const soilToFertilizerMap = makeMaps(groups[2])
  // const fertilizerToWaterMap = makeMaps(groups[3])
  // const waterToLightMap = makeMaps(groups[4])
  // const lightToTemperatureMap = makeMaps(groups[5])
  // const temperatureToHumidityMap = makeMaps(groups[6])
  // const humidityToLocationMap = makeMaps(groups[7].replace(/\n$/, ''))

  const map = makeMaps(groups[1])
  // const map = makeMaps(groups[2])
  // const map = makeMaps(groups[3])
  // const map = makeMaps(groups[4])
  // const map = makeMaps(groups[5])
  // const map = makeMaps(groups[6])
  // const map = makeMaps(groups[7].replace(/\n$/, ''))

  for (const seedsKey in seeds) {
    seeds[seedsKey] = transform(map, seeds[seedsKey])
  }

  console.log(seeds)

  // for (const seed of seeds) {
  //   const soil = transform(seedToSoilMap, seed)
  //   const fertilizer = transform(soilToFertilizerMap, soil)
  //   const water = transform(fertilizerToWaterMap, fertilizer)
  //   const light = transform(waterToLightMap, water)
  //   const temperature = transform(lightToTemperatureMap, light)
  //   const humidity = transform(temperatureToHumidityMap, temperature)
  //   const location = transform(humidityToLocationMap, humidity)
  //
  //   // console.log(`Seed ${seed}, soil ${soil}, fertilizer ${fertilizer}, water ${water}, light ${light}, temperature ${temperature}, humidity ${humidity}, location ${location}.`)
  //   if (result === -1 || result > location)
  //     result = location
  // }
  return result
}

console.log('result:', run())
