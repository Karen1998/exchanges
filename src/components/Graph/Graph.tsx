import React, { FC } from 'react'
import Paper from '@material-ui/core/Paper';
import { ICalculatedData } from 'src/types/types';
import { Box, Typography } from '@material-ui/core';
import { timeFormat } from 'src/helpers/timeFormat';

interface IProps {
  additionalData: ICalculatedData;
}

const Graph: FC<IProps> = ({ additionalData }) => {
  return (
    <Paper>

      <Box padding="15px">
        <Typography>
          Average - {additionalData.average}
        </Typography>

        <Typography>
          Mod - {additionalData.mod}
        </Typography>

        <Typography>
          Median -  {additionalData.median}
        </Typography>

        <Typography>
          Average deviation -  {additionalData.averageDeviation}
        </Typography>

        <Typography>
          Standard deviation -  {additionalData.standardDeviation}
        </Typography>

        <Typography>
          Lost values -  {additionalData.lostValues}
        </Typography>

        <Typography>
          Results count -  {additionalData.length}
        </Typography>

        <Typography>
          Spent time for last calculation -  {timeFormat(additionalData.spentTime)}
        </Typography>

        <Typography>
          Spent time for all calculations - {timeFormat(additionalData.wholeSpentTime)}
        </Typography>
      </Box>
    </Paper>
  )
}

export default Graph
