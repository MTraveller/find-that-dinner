// Imports, to be used
import { recipesGrid, grabRecipeCard, body, content, handleCloseModal } from './handlers.js';
import { drawChart } from './utils.js';

let posY = 0;

function displaySingleRecipe(producedSingleHTML) {
  console.log(producedSingleHTML);
  // Grabs the aside after it has been printed on document
  const recipeCard = body.querySelector('.recipe-card-single');

  // Check 'aside' exists and remove it if it does to be replaced by the new clicked recipe
  if (recipeCard) body.removeChild(body.firstChild);

  // Create aside modal
  const cardSection = document.createElement('section');
  cardSection.classList.add('recipe-card-single');
  cardSection.innerHTML = producedSingleHTML;

  // Body top position relative to the browser's viewport code from
  posY = body.getBoundingClientRect().top;

  // Temporary add class to content
  // content.classList.add('hidden');
  content.style.display = 'none';

  //  Print single recipe on the document
  body.prepend(cardSection);

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Fire the close modal eventListener once done with printing the recipe
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
export { displayRecipes, displaySingleRecipe, posY };