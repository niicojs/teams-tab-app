import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';

import Loading from './LoadingWalking';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  date: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  export: {
    marginTop: theme.spacing(2)
  }
}));

export default function Reports() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const id = Math.random()
    .toString(36)
    .substring(2, 15);

  const check = id => {
    const done = Cookies.get(id);
    if (done) {
      setLoading(false);
    } else {
      setTimeout(() => check(id), 1000);
    }
  };

  const click = () => {
    setLoading(true);
    document.getElementById('export').submit();
    check(id);
  };

  return (
    <>
      <form
        id="export"
        method="POST"
        className={classes.form}
        action="/api/reports"
        target="invisible"
      >
        <input name="id" type="hidden" value={id} />
        <TextField
          label="Début"
          type="date"
          name="debut"
          defaultValue="2020-01-01"
          className={classes.date}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fin"
          type="date"
          name="fin"
          defaultValue="2020-03-01"
          className={classes.date}
          InputLabelProps={{ shrink: true }}
        />
      </form>
      <Button
        className={classes.export}
        variant="contained"
        color="primary"
        onClick={click}
        disabled={loading}
      >
        Export
      </Button>
      <Loading loading={loading} size={400}></Loading>
      <iframe title="download" style={{ display: 'none' }} name="invisible"></iframe>
    </>
  );
}
