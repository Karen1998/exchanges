import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { wrap } from 'comlink';

import Graph from './components/Graph';
import GraphActions from './components/GraphActions';
import Loader from './utils/Loader';
import { ICalculatedData, IChartData, IChartDataForStatistic } from './types/types';


const client = new W3CWebSocket('wss://trade.trademux.net:8800/?password=1234');


type TModData = {
  [key: number]: number
}

function App() {
  const [showStatistic, setShowStatistic] = useState(false);
  const [loader, setLoader] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    text: 'Connecting ...'
  });


  const chartDataRef = useRef<IChartDataForStatistic[]>([]);
  const modDataRef = useRef<TModData[]>([]);
  const calculatedDataRef = useRef<ICalculatedData>({
    average: 0,
    standardDeviation: 0,
    averageDeviation: 0,
    mod: 0,
    median: 0,
    lostValues: 0,
    spentTime: 0,
    wholeSpentTime: 0,
    length: 0,
  });

  useEffect(() => {
    // Connect to the socket
    client.onopen = () => {
      console.log('Connected');
      setConnectionStatus({
        connected: true,
        text: 'Connected'
      });
    }
  }, []);

  const calculateValues = (newData: IChartData[]) => {
    const calculationWorker = new Worker('./workers/calculations', { name: 'calculation-worker', type: 'module' });
    const calculationWorkerApi = wrap<import('./workers/calculations').CalculationWorker>(calculationWorker)
    calculationWorkerApi
      .calculateChartData(calculatedDataRef.current, modDataRef.current, newData)
      .then((res: {
        calculatedData: ICalculatedData,
        modDataRef: TModData[]
      }) => {
        calculatedDataRef.current = res.calculatedData;
        modDataRef.current = res.modDataRef;
        setLoader(false);
      });
  };

  const addDataToCharStatistic = (data: IChartData) => {
    chartDataRef.current.push({
      argument: chartDataRef.current.length,
      id: data.id,
      value: data.value,
    });
  };

  const startTrackingValues = () => {
    console.log('Start tracking values...');

    client.onmessage = (message) => {
      addDataToCharStatistic(JSON.parse(message.data.toString()));
    }
  }

  const showStatisticGraph = () => {
    if (chartDataRef.current.length === 0) {
      return false;
    }

    setShowStatistic(true);
    setLoader(true);

    calculateValues(chartDataRef.current)
  };

  const closeConnection = () => {
    client.close();
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        position="relative"
        minHeight="100vh"
      >
        {loader && <Loader />}

        <Box
          display="flex"
          alignItems="center"
          width="100%"
        >
          <GraphActions
            startTrackingValues={startTrackingValues}
            closeConnection={closeConnection}
            showStatisticGraph={showStatisticGraph}
          />

          <Box>
            <Typography style={{
              transform: connectionStatus.connected ? 'rotateX(100%)' : '',
              opacity: connectionStatus.connected ? 0 : 1,
              pointerEvents: connectionStatus.connected ? 'none' : 'all',
              transition: '100ms opacity 150ms easy-out, 100ms transform 150ms easy-out'
            }}>
              {connectionStatus.text}
            </Typography>
          </Box>
        </Box>

        <Box
          marginTop="25px"
          flex="1"
        >
          {showStatistic && (
            <Graph
              additionalData={calculatedDataRef.current}
            />
          )}
        </Box>


      </Box>
    </Container>
  );
}

export default App;
