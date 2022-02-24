// Imports, to be used
import { fetchSubmit, fetchRecipe } from './utils.js';

const body = document.querySelector('body');
const form = body.querySelector('[name="search"]');
const recipesGrid = body.querySelector('.recipes');

function handleRecipeClick(e) {
  const recipe = e.currentTarget.querySelector('.recipe-card-title').innerText;
  fetchRecipe(recipe);
}

function grabRecipeCard() {
  const recipeCards = recipesGrid.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(recipeCard) {
    recipeCard.addEventListener('click', handleRecipeClick)
  });
}

form.addEventListener('submit', fetchSubmit);
form.addEventListener('enter', fetchSubmit);

// Exports, to be used in other JS files
export { recipesGrid, grabRecipeCard, body };