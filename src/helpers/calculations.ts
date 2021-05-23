import { ICalculatedData, IChartData } from "src/types/types";

type TModData = {
  [key: number]: number
}

type TReturnedData = {
  calculatedData: ICalculatedData,
  modDataRef: TModData[]
}

// Creating array by chart values and their repeated times
// [{ 1000: 10, 1200: 21 }] -> 1000 value repeated 10 times, 1200 -> 21 times
const createModDataArray = (array: TModData[], currentItem: IChartData): TModData[] => {
  // Finding existing data
  let updatedArray = [...array];
  let existingModDataIndex = updatedArray.findIndex((obj) => Number(Object.keys(obj)[0]) === currentItem.value);

  // If there is such value in existing array, increase by one
  // if no -> create new one
  if (existingModDataIndex !== -1) {
    updatedArray[existingModDataIndex] = {
      [Object.keys(updatedArray[existingModDataIndex])[0]]: Object.values(updatedArray[existingModDataIndex])[0] + 1
    }
  } else {
    updatedArray.push({
      [currentItem.value]: 1
    })
  }

  return updatedArray;
}

const findTheModValue = (array: TModData[]): number => {
  let maxValue = 0;
  let maxValueKey = 0;

  array.forEach((modData) => {
    Object.entries(modData).forEach(([key, value]) => {
      if (maxValue < value) {
        maxValue = value;
        maxValueKey = Number(key);
      }
    })
  });

  return maxValueKey;
}

export const calculateChartData = (
  calculatedData: ICalculatedData,
  modData: TModData[],
  data: IChartData[]
): Promise<TReturnedData> => {
  return new Promise((res) => {

    // Every loop will calculate values for new arrays of data
    // e.x. -> [0 - 1000] calculated values, new data count is 2500, calculation will start from 1000rd element
    // and will loop only for [1000 - 2500] elements

    const timeStart = new Date().getTime();

    let newAverageValue = 0;
    let modDataRef = [...modData];

    for (let i = calculatedData.length; i < data.length; i++) {
      let currentItem = data[i];

      if (!currentItem?.value) {
        calculatedData.lostValues = calculatedData.lostValues + 1;
        continue;
      }

      newAverageValue = newAverageValue + currentItem.value;

      // Updating mod values array
      modDataRef = createModDataArray(modDataRef, currentItem);
    }

    // Get average data for new values
    newAverageValue = newAverageValue / (data.length - calculatedData.length);

    // Update average data
    calculatedData.average = (calculatedData.average + newAverageValue) / 2;

    // Calculating deviation
    let deviationItemsSquareSum = 0;

    for (let i = calculatedData.length; i < data.length; i++) {
      let currentItem = data[i];

      deviationItemsSquareSum += Math.pow(currentItem.value - calculatedData.average, 2);
    }

    // Set up the deviations
    calculatedData.averageDeviation += Math.sqrt((deviationItemsSquareSum / (data.length - calculatedData.length)));
    calculatedData.standardDeviation += Math.sqrt((deviationItemsSquareSum / ((data.length - 1) - calculatedData.length)));

    // Calculating median
    if (data.length % 2 === 0) {
      let n = data[data.length / 2].value;

      calculatedData.median = (n + (n + 1)) / 2;
    } else {
      calculatedData.median = data[(data.length + 1) / 2].value;
    }

    // Get the mod value
    calculatedData.mod = findTheModValue(modDataRef);

    // Calculating time spent for calculations
    calculatedData.spentTime = new Date().getTime() - timeStart;
    calculatedData.wholeSpentTime = calculatedData.wholeSpentTime + calculatedData.spentTime;

    // Update calculated data length
    calculatedData.length = data.length;

    res({
      calculatedData,
      modDataRef
    });
  })
}
