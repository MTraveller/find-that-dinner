// Imports, to be used
import { fetchRecipes, fetchResults } from './apis.js';
import { displayRecipes, displaySingleRecipe } from './app.js';

function genRecipe(locatedRecipe) {
  console.log(locatedRecipe);
  // Temp reused generation code of recipeCardsGen()
  console.log(locatedRecipe.recipe.dietLabels.length);
  const genRecipeHTML = 
    `<h2 class="recipe-title">${locatedRecipe.recipe.label}</h2>
     <figure class="recipe-image"><img src="${locatedRecipe.recipe.image}" title="${locatedRecipe.recipe.label}" alt="${locatedRecipe.recipe.label}"></figure>
     <h3>Cuisine: ${locatedRecipe.recipe.cuisineType}</h3>
     ${locatedRecipe.recipe.dietLabels.length === 0 ? '' : `${locatedRecipe.recipe.dietLabels.length === 1 ? `<h3>Diet: ${locatedRecipe.recipe.dietLabels[0]}</h3>` : `<h3>Diet: ${locatedRecipe.recipe.dietLabels[0]}, ${locatedRecipe.recipe.dietLabels[1]}</h3>`}`}
     <button><a href="${locatedRecipe.recipe.url}" target="_blank">See recipe on: ${locatedRecipe.recipe.source}</a></button>`
  ;

  displaySingleRecipe(genRecipeHTML);
}

function fetchRecipe(recipeLabel, data = fetchResults) {
  const fullRecipe = data.find(item => item.recipe.label === recipeLabel);
  genRecipe(fullRecipe);
}

// Generate the html for the recipeCards
function recipeCardsGen(recipes) {
  const genCardsHTML = recipes.map((item) =>    
    `<figure class="recipe-card-image"><img src="${item.recipe.images.REGULAR.url}" title="${item.recipe.label}" alt="${item.recipe.label}"></figure>
      <h2 class="recipe-card-title">${item.recipe.label}</h2>
      <span class="recipe-card-info">${Math.floor(item.recipe.calories)} calories</span><span class="recipe-card-info-divider">|</span><span class="recipe-card-info">${item.recipe.ingredients.length} ingredients</span>
      <h3 class="recipe-card-source">${item.recipe.source}</h3>`
  );
  displayRecipes(genCardsHTML);
}

// Sends the search request to fetchRecipes()
async function fetchSubmit(e) {
    e.preventDefault();
    const formButton = e.currentTarget;
  
    // Temporary disable the search button
    formButton.search.disabled = true;
  
    // Fetch and display the results of the searched keyword
    const recipesResults = await fetchRecipes(formButton.keyword.value);
      
    // Enable the search button again
    formButton.search.disabled = false;
}

// Exports, to be used in other JS files
export { fetchSubmit, fetchRecipe, recipeCardsGen };