import { form } from './forms.js';
import { fetchSubmit, fetchRecipe } from './utils.js';

const recipesGrid = document.querySelector('.recipes');

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

export { recipesGrid, grabRecipeCard };