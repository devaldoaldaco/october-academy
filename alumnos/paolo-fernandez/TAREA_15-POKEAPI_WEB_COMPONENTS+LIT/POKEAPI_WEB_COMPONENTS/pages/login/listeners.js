import { Router } from '../../router.js';

export const loginFormSubmitListener = (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password').value;

  if (email !== 'admin@email.com' || password !== 'admin') {
    alert('Credenciales incorrectas');
    return;
  }

  localStorage.setItem('isLogged', true);
  
  setTimeout(() => Router.navigate('pokedex'), 2000);
}