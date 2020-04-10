import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { Lottie } from '@crello/react-lottie';

const useStyles = makeStyles((theme) =>
  createStyles({
    animation: {
      marginTop: theme.spacing(5),
      textAlign: 'center',
      alignContent: 'center',
      margin: 'auto',
    },
  })
);

export default ({ size = '100px', url = undefined, data = undefined }) => {
  const classes = useStyles();

  const options = {
    loop: true,
    autoplay: true,
    path: url,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  return (
    <Lottie
      config={options}
      height={size}
      width={size}
      className={classes.animation}
    />
  );
};
