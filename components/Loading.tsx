import React from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';

import Loader from 'react-loader-spinner';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) =>
  createStyles({
    loading: {
      marginTop: theme.spacing(5),
      textAlign: 'center',
    },
  })
);

export default ({
  loading,
  children = undefined,
  size = '100px',
  type = 'Audio',
}) => {
  if (loading) {
    const theme = useTheme();
    const classes = useStyles();
    return (
      <Box className={classes.loading}>
        <Loader
          type={type}
          height={size}
          width={size}
          color={theme.palette.primary.main}
        />
      </Box>
    );
  } else {
    return children || null;
  }
};
