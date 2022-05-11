const questions2 = document.querySelectorAll('.question2');
const next2 = document.querySelector('.next2');
const prev2 = document.querySelector('.prev2');
let i2 = 0;

next2.addEventListener('click', () => {
  questions2[i2].classList.add('hidden');
  i2 < questions2.length - 1 ? i2++ : (i2 = 0);
  questions2[i2].classList.remove('hidden');
});

prev2.addEventListener('click', () => {
  questions2[i2].classList.add('hidden');
  i2 > 0 ? i2-- : (i2 = questions2.length - 1);
  questions2[i2].classList.remove('hidden');
});
