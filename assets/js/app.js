// Imports, to be used
import { recipesGrid, grabRecipeCard, body } from './handlers.js';

function displaySingleRecipe(producedSingleHTML) {
  console.log(producedSingleHTML);
  let recipeCard = body.querySelector('aside');

    // Check cards exists and replace them with new recipes
  if (recipeCard) body.removeChild( body.firstChild );

    // Iterates through the html array and prints it on the document
    let cardAside = document.createElement('aside');
    cardAside.classList.add('recipe-card','single');
    cardAside.innerHTML = producedSingleHTML;
    body.prepend(cardAside);
    
  grabRecipeCard();
}

// Function that extracts the info from the returned api response and loops over each item
function displayRecipes(producedHTML) {
  let cardDivs = recipesGrid.querySelectorAll('.recipe-card');

    // Check cards exists and replace them with new recipes
  if (cardDivs.length > 1) while ( recipesGrid.firstChild ) recipesGrid.removeChild( recipesGrid.firstChild );

    // Iterates through the html array and prints it on the document
    producedHTML.forEach(htmlResult => {
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('recipe-card');
      cardDiv.innerHTML = htmlResult;
      recipesGrid.appendChild(cardDiv);
    });
    
  grabRecipeCard();
}

// Exports, to be used in other JS files
export { displayRecipes, displaySingleRecipe };