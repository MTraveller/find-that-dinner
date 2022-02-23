import { form } from './forms.js';
import { fetchSubmit } from './utils.js';

const recipesGrid = document.querySelector('.recipes');
// let recipeCard = null;

function handleRecipeClick(e) {
  console.log(e.currentTarget);
}

function grabRecipeCard() {
  const recipeCards = recipesGrid.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(recipeCard) {
    recipeCard.addEventListener('click', handleRecipeClick)
  });
}

form.addEventListener('submit', fetchSubmit);
form.addEventListener('enter', fetchSubmit);

export { recipesGrid, grabRecipeCard };