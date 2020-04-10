import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Animation from '../components/LottieAnimation';
import data from '../src/animations/error.json';

const useStyles = makeStyles(theme => ({
  container: {
    alignContent: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: 'x-large'
  }
}));

export default ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Animation data={data} size='250px' />
      <div className={classes.message}>{message}</div>
    </div>
  );
};
