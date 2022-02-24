import { recipesGrid, grabRecipeCard } from './handlers.js';

function displaySingleRecipe(producedSingleHTML) {
  console.log(producedSingleHTML);
}

// Function that extracts the info from the returned api response and loops over each item
function displayRecipes(producedHTML) {
  let cardDivs = recipesGrid.querySelectorAll('.recipe-card');

    // Check cards exists and replace them with new recipes
  if (cardDivs.length === 0) {

    // Iterates through the html array and prints it on the document
    producedHTML.forEach(htmlResult => {
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('recipe-card');
      cardDiv.innerHTML = htmlResult;
      recipesGrid.appendChild(cardDiv);
    });

  } else {

    // Remove existing recipes
    while ( recipesGrid.firstChild ) recipesGrid.removeChild( recipesGrid.firstChild );

    // Iterates through the html array and prints it on the document
    producedHTML.forEach(htmlResult => {
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('recipe-card');
      cardDiv.innerHTML = htmlResult;
      recipesGrid.appendChild(cardDiv);
    });
  }
  grabRecipeCard();
}

export { displayRecipes, displaySingleRecipe };