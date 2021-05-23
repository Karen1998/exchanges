import React, { FC } from 'react'
import { Button } from '@material-ui/core'

interface IProps {
  startTrackingValues: () => void,
  closeConnection: () => void,
  showStatisticGraph: () => void
}

const GraphActions: FC<IProps> = ({ startTrackingValues, closeConnection, showStatisticGraph }) => {
  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={startTrackingValues}
      >
        Start
      </Button>

      <Button
        color="secondary"
        variant="outlined"
        onClick={closeConnection}
      >
        Close
      </Button>

      <Button
        variant="outlined"
        onClick={showStatisticGraph}
      >
        Statistic
      </Button>
    </div>
  )
}

export default GraphActions
