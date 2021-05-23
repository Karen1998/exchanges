import { expose } from 'comlink';

import { calculateChartData } from 'src/helpers/calculations';

const exports = {
    calculateChartData
};

export type CalculationWorker = typeof exports;

expose(exports);
