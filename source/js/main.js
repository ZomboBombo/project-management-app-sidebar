import counterCalculate from './someScript';

const heading_1 = document.querySelector('h1');
console.log('heading_1:', heading_1);

heading_1.addEventListener('click', (evt) => {
  evt.preventDefault();
  counterCalculate();
  counterCalculate();
});