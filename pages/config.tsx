import { useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import useTeams from '../src/useTeams';

export default function Config() {
  const { teams, ready, context } = useTeams();
  const [info, setInfo] = useState('loading');
  const init = useRef<boolean>();

  if (!init.current) {
    if (ready && teams) {
      init.current = true;
      const appUrl = window.location.origin;
      setInfo(appUrl);
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
  }

  return (
    <div>
      <div>
        <Typography variant="h4">Config</Typography>
      </div>
      <div>Nothing to be done here, carry one :)</div>
    </div>
  );
}
