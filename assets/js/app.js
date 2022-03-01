// Imports, to be used
import { recipesGrid, grabRecipeCard, body, cardSection, handleCloseModal } from './handlers.js';
import { genGooglePie } from './utils.js';

function displayHelp() {
  console.log('Hello!')
}

function displaySingleRecipe(producedSingleHTML) {
  // Grab the recipe section modal
  const recipeCard = body.querySelector('article');

  // Check if 'article' element exists and remove it if it does, to be replaced by the new clicked recipe
  if (recipeCard) cardSection.removeChild(cardSection.firstChild);

  // Create article modal
  const cardArticle = document.createElement('article');
  cardArticle.innerHTML = producedSingleHTML;

  // Temporary add class to content
  body.style.overflow = 'hidden';

  // Temporary add class to section
  cardSection.classList.add('active');

  // Print single recipe on the document
  cardSection.prepend(cardArticle);

  // Run the google pie api in utils.js
  genGooglePie();

  // Fire the close modal eventListener in handlers.js
  handleCloseModal();
}

// Function that extracts the info from the returned api response and loops over each item
function displayRecipes(producedHTML) {
  let cardDivs = recipesGrid.querySelectorAll('.recipe-card');

  // Check cards exists and replace them with new fetched recipes
  if (cardDivs.length > 1) while (recipesGrid.firstChild) recipesGrid.removeChild(recipesGrid.firstChild);

  // Iterates through the HTML array produced for fetched recipes and prints them on the document
  producedHTML.forEach(htmlResult => {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('recipe-card');
    cardDiv.innerHTML = htmlResult;
    recipesGrid.appendChild(cardDiv);
  });

  // Run function grabRecipeCard in handlers.js
  grabRecipeCard();
}

// Exports, to be used in other JS files
export { displayRecipes, displaySingleRecipe, displayHelp };