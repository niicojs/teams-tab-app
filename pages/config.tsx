import { useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import useTeams from '../src/useTeams';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default function Config() {
  const classes = useStyles();
  const { teams } = useTeams({});

  useEffect(() => {
    if (teams) {
      const appUrl = window.location.origin;
      teams.settings.registerOnSaveHandler((saveEvent) => {
        teams.settings.setSettings({
          websiteUrl: appUrl,
          contentUrl: appUrl,
          entityId: 'my-app',
          suggestedDisplayName: 'My App',
        });
        saveEvent.notifySuccess();
      });
      teams.settings.setValidityState(true);
    }
  }, teams);

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <div>
          <Typography variant="h4">Config</Typography>
        </div>
        <div>Nothing to be done here, carry one :)</div>
      </div>
    </Container>
  );
}
