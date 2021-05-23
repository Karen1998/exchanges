import React, { FC } from 'react'
import { Box, CircularProgress, fade, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundColor: fade('#fff', .7),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));


const Loader: FC = () => {
  const styles = useStyles();

  return (
    <Box
      className={styles.root}
    >
      <CircularProgress color="secondary" />
    </Box>
  )
}

export default Loader
