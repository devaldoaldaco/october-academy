document.addEventListener('DOMContentLoaded', () => {
  const FORM_STEPS = 4;
  const FORM_WIDTH = 700;
  
  let currentStep = 1;

  const btnNext = document.getElementById('btn-next');
  const btnConfirm = document.getElementById('btn-confirm');
  const containerProgressPercentage = document.getElementById('progress-percentage');
  const formFieldsetsArray = document.querySelectorAll('fieldset');
  const progressBar = document.getElementById('progress');
  const mainForm = document.getElementById('main-form');
  const containerFinish = document.getElementById('container-finish');

  renderActiveStep();

  btnNext.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentStep === FORM_STEPS) return;

    currentStep++;
    renderActiveStep();
  });

  btnConfirm.addEventListener('click', (event) => {
    event.preventDefault();

    progressBar.style.width = `${ FORM_WIDTH }px`;
    mainForm.style.display = 'none';
    containerFinish.style.display = 'block';
    containerProgressPercentage.innerText = 100;
  });

  function renderActiveStep() {
    formFieldsetsArray.forEach(fieldset => {
      const stepNumber = Number(fieldset.dataset.stepNumber);

      fieldset.style.display = stepNumber === currentStep ? 'flex' : 'none';

      btnNext.style.display = currentStep === FORM_STEPS ? 'none' : 'inline-block';
      btnConfirm.style.display = currentStep === FORM_STEPS ? 'inline-block' : 'none';
    });

    const progressPercentage = (currentStep - 1) / FORM_STEPS
    const progressBarWidth = FORM_WIDTH * progressPercentage;

    progressBar.style.width = `${ progressBarWidth }px`;
    containerProgressPercentage.innerText = progressPercentage * 100;
  }
});