import { useState, useRef } from 'react';
import useSSR from 'use-ssr';
import * as Msal from 'msal';

export interface User {
  id: string;
  name: string;
  userName: string;
  accessToken: string;
}

export default function ({
  authOnly = false,
  clientId = '',
  blankPage = '/blank',
  authPage = '/auth',
}) {
  const [teams, setTeams] = useState(null);
  const [context, setContext] = useState(null);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [auth, setAuth] = useState<Msal.UserAgentApplication>(null);
  const init = useRef<boolean>();

  const { isServer } = useSSR();

  // init teams sdk (dynamically cause it crashes server side)
  if (!authOnly) {
    if (!init.current) {
      init.current = true;
      if (!isServer) {
        (async () => {
          try {
            const microsoftTeams = await import('@microsoft/teams-js');
            try {
              microsoftTeams.initialize();
            } catch {}
            setTeams(microsoftTeams);
            microsoftTeams.getContext((context) => {
              setContext(context);
            });
          } catch {}
        })();
      }
    }
  }

  // init auth library
  const loginCallback = (error, response) => {
    console.log('handleRedirectCallback');
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  };

  if (!isServer && !auth) {
    const msalConfig = {
      auth: { clientId },
      authority: 'https://login.microsoftonline.con/organizations/',
    };

    const instance = new Msal.UserAgentApplication(msalConfig);
    instance.handleRedirectCallback(loginCallback);

    setAuth(instance);
  }

  const silentLogin = async (loginHint) => {
    const request = {
      loginHint,
      prompt: 'none',
      scopes: ['profile', 'user.read'],
      redirectUri: `${window.location.origin}${blankPage}`,
    };
    try {
      const tokenResponse = await auth.acquireTokenSilent(request);
      return tokenResponse;
    } catch {}
    return null;
  };

  const teamsLogin = (loginHint) => {
    const request = {
      loginHint,
      scopes: ['profile', 'user.read'],
    };

    teams.authentication.authenticate({
      url: `${window.location.origin}${authPage}?user=${context.userPrincipalName}`,
      width: 700,
      height: 600,
      successCallback: (result) => console.log(result),
      failureCallback: (reason) => console.log(reason),
    });
  };

  const loginRedirect = async (loginHint) => {
    const request = {
      loginHint,
      scopes: ['profile', 'user.read'],
    };

    auth.acquireTokenRedirect(request);
  };

  const login = async () => {
    const token = await silentLogin(context.userPrincipalName);
    if (!token) {
      teamsLogin(context.userPrincipalName);
      return;
    }
    const account = auth.getAccount();
    console.log(account);
    setCurrentUser({
      id: account.accountIdentifier,
      name: account.name,
      userName: account.userName,
      accessToken: token.accessToken,
    });
  };

  return { teams, context, login, loginRedirect, currentUser };
}
