import React, { FC } from 'react'
import { Button, makeStyles } from '@material-ui/core'

interface IProps {
  startTrackingValues: () => void,
  closeConnection: () => void,
  showStatisticGraph: () => void
}


const useStyles = makeStyles(() => ({
  btn: {
    marginRight: 15,

    '&:last-child': {
      marginRight: 0
    }
  },
  customBtn: {
    marginLeft: 15,
    border: '1px solid #000',
    transition: 'background-color 150ms, border 150ms',
    borderRadius: 5,
    backgroundColor: 'transparent',
    padding: '5px 10px',

    '&:hover': {
      backgroundColor: '#999',
      cursor: 'pointer'
    },
    '&:active, &:focus': {
      backgroundColor: '#ff0'
    },
  }
}))

const GraphActions: FC<IProps> = ({ startTrackingValues, closeConnection, showStatisticGraph }) => {
  const styles = useStyles();

  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={startTrackingValues}
        className={styles.btn}
      >
        Start
      </Button>

      <Button
        color="secondary"
        variant="outlined"
        onClick={closeConnection}
        className={styles.btn}
      >
        Close
      </Button>

      <Button
        variant="outlined"
        onClick={showStatisticGraph}
        className={styles.btn}
      >
        Statistic
      </Button>

      <button
        className={styles.customBtn}
      >
        Custom button (Hover and click me)
      </button>
    </div>
  )
}

export default GraphActions
