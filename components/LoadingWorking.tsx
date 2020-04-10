import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { Lottie } from '@crello/react-lottie';

import animationData from '../src/animations/working.json';

const useStyles = makeStyles((theme) =>
  createStyles({
    loading: {
      marginTop: theme.spacing(5),
      textAlign: 'center',
      alignContent: 'center',
      margin: 'auto',
    },
  })
);

export default ({ loading, children = undefined, size = '100px' }) => {
  if (loading) {
    const classes = useStyles();

    const options = {
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <Lottie
        config={options}
        height={size.toString()}
        width={size.toString()}
        className={classes.loading}
      />
    );
  } else {
    return children || null;
  }
};
