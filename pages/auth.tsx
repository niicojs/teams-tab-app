import useSSR from 'use-ssr';
import useTeams from '../src/useTeams';

export default function () {
  const { isServer } = useSSR();

  if (!isServer) {
    const { loginRedirect } = useTeams({
      authOnly: true,
      clientId: process.env.APP_CLIENT_ID,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    loginRedirect(user);
  }
  console.log('Auth Page');
  return <div>Auth</div>;
}
