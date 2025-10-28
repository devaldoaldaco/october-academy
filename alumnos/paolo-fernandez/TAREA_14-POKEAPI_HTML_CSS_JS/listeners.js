export const flipCard = (event) => {
  const button = event.currentTarget;
  const card = button.closest('.pokemon-card');
  card.classList.toggle('flipped');
}