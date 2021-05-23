export interface IChartData {
    id: number;
    value: number;
}

export interface IChartDataForStatistic {
    id: number;
    value: number;
    argument: number;
}

export interface ICalculatedData {
    average: number;
    standardDeviation: number;
    averageDeviation: number;
    mod: number;
    median: number;
    lostValues: number;
    spentTime: number;
    wholeSpentTime: number;
    length: number;
}
