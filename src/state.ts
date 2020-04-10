import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  user: null
});

export const setCurrentUser = user => {
  setGlobalState('user', user);
};

export { useGlobalState };
