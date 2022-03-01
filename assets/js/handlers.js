// Imports, to be used
import { fetchSubmit, fetchRecipe } from './utils.js';
// import { posY } from './app.js';

// Query selectors
const body = document.querySelector('body');
const content = body.querySelector('.content');
const form = content.querySelector('[name="search"]');
const recipesGrid = content.querySelector('.recipes');

// Function to remove the modal
function closeModal(e) {
  if (e.currentTarget) body.removeChild(body.firstChild);

  // Remove added classes
  body.style.removeProperty('overflow');
  // content.style.removeProperty('display');

  // Scroll to position
  // window.scrollTo(0, Math.abs(posY));
  // console.log('Should be ' + Math.abs(posY));
}

// Select and add an eventListener once to close the modal
function handleCloseModal() {
  const modalRecipe = body.querySelector('.close-modal');
  modalRecipe.addEventListener('click', closeModal, { once: true });
}

// Function to fetch & display the clicked recipe and add an evetListener to close the modal
function handleRecipeClick(e) {
  const recipe = e.currentTarget.querySelector('.recipe-card-title').innerText;
  // Run fetchRecipe function from utils.js 
  fetchRecipe(recipe);
}

// Function to handle each recipe cards clicks
function grabRecipeCard() {
  const recipeCards = recipesGrid.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(recipeCard) {
    recipeCard.addEventListener('click', handleRecipeClick)
  });
}

// eventListeners for the input search box
form.addEventListener('submit', fetchSubmit);
form.addEventListener('enter', fetchSubmit);

// Exports, to be used in other JS files
export { recipesGrid, grabRecipeCard, body, content, handleCloseModal };