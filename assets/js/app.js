// Imports, to be used
import { recipesGrid, grabRecipeCard, body, cardSection, handleCloseModal } from './handlers.js';
import { displayGooglePie } from './utils.js';

function displaySingleRecipe(producedSingleHTML) {
  // Grab the section
  const recipeCard = body.querySelector('article');

  // Check if 'article' element exists and remove it if it does, to be replaced by the new clicked recipe
  if (recipeCard) cardSection.removeChild(cardSection.firstChild);

  // Create article modal
  const cardArticle = document.createElement('article');
  cardArticle.innerHTML = producedSingleHTML;

  // Temporary add class to content
  body.style.overflow = 'hidden';

  cardSection.classList.add('active');

  // Print single recipe on the document
  cardSection.prepend(cardArticle);

  // Run the google pie api
  displayGooglePie();

  // Fire the close modal eventListener
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

  // Run function grabRecipeCard handlers.js
  grabRecipeCard();
}

// Exports, to be used in other JS files
export { displayRecipes, displaySingleRecipe };