import { Router } from '../../router.js';

export const logout = () => {
  localStorage.removeItem('isLogged');

  setTimeout(() => Router.navigate('login'), 2000);
}