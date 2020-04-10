import { useState, useRef } from 'react';
import useSSR from 'use-ssr';

export default function () {
  const [teams, setTeams] = useState(null);
  const [ready, setReady] = useState(false);
  const [context, setContext] = useState(null);
  const init = useRef<boolean>();

  var { isServer } = useSSR();

  if (!init.current) {
    init.current = true;
    if (!isServer) {
      (async () => {
        try {
          const microsoftTeams = await import('@microsoft/teams-js');
          microsoftTeams.initialize();
          setTeams(microsoftTeams);
          microsoftTeams.getContext((context) => {
            setContext(context);
            setReady(true);
          });
        } catch (e) {
          setReady(true);
        }
      })();
    }
  }

  return { teams, ready, context };
}
