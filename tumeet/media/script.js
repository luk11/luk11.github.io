const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
  });
});

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active');
  });
}

/////////////////// TEXT SLIDESHOW
const questions = document.querySelectorAll('.question');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let i = 0;

next.addEventListener('click', () => {
  questions[i].classList.add('hidden');
  i < questions.length - 1 ? i++ : (i = 0);
  questions[i].classList.remove('hidden');
});

prev.addEventListener('click', () => {
  questions[i].classList.add('hidden');
  i > 0 ? i-- : (i = questions.length - 1);
  questions[i].classList.remove('hidden');
});

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
