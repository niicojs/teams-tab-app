import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Animation from '../components/LottieAnimation';

const useStyles = makeStyles(theme => ({
  main: {
    textAlign: 'center',
    fontSize: 'x-large',
    marginTop: theme.spacing(5)
  }
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>Page Introuvable</div>
      <Animation
        size='400px'
        url="https://assets6.lottiefiles.com/packages/lf20_GIyuXJ.json"
      />
    </div>
  );
}
