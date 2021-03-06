// Imports, to be used
import { fetchSubmit, fetchRecipe, genHelp } from './utils.js';

// Query selectors
const body = document.querySelector('body');
const cardSection = body.querySelector('.modal');
const help = body.querySelector('.help');
const content = body.querySelector('.content');
const form = content.querySelector('[name="search"]');
const recipesGrid = content.querySelector('.recipes');

// Function to remove the modal
function closeModal() {
  // Remove added class to section
  cardSection.classList.remove('active');

  // Remove added classes
  return body.style.removeProperty('overflow');
}

// Select and add an eventListener once to close the modal
function handleCloseModal() {
  const modalRecipe = body.querySelector('.close-modal');
  modalRecipe.addEventListener('click', closeModal, { once: true });

  // Close the modal on ESC key if pressed
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeModal();
    }
  });
  return;
}

// Function to fetch & display the clicked recipe and add an evetListener to close the modal
function handleRecipeClick(e) {
  const recipe = e.currentTarget.querySelector('.recipe-card-title').innerText;
  // Run fetchRecipe function in utils.js 
  return fetchRecipe(recipe);
}

// Function to handle each recipe cards clicks
function grabRecipeCard() {
  const recipeCards = recipesGrid.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(recipeCard) {
    recipeCard.addEventListener('click', handleRecipeClick);
  });
  return;
}

// eventListener for help link trigger genHelp function in utils.js
help.addEventListener('click', genHelp);
// eventListeners for the input search box triggers fetchSubmit in utils.js
form.addEventListener('submit', fetchSubmit);
form.addEventListener('enter', fetchSubmit);

// Exports, to be used in other JS files
export { recipesGrid, grabRecipeCard, body, cardSection, content, handleCloseModal };