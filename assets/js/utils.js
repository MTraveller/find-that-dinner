import { firstEndpoint, lastEndpoint } from './apis.js';
import { displayRecipes } from './scripts.js';

let results = [];

function fetchRecipe(recipeLabel) {
  console.log(results);
  console.log(recipeLabel);
}

// Generate the html for the recipeCards
function recipeCardsGen(recipes) {
  const genHTML = recipes.map((item) =>    
    `<figure class="recipe-card-image"><img src="${item.recipe.images.REGULAR.url}" title="${item.recipe.label}" alt="${item.recipe.label}"></figure>
      <h2 class="recipe-card-title">${item.recipe.label}</h2>
      <span class="recipe-card-info">${Math.floor(item.recipe.calories)} calories</span><span class="recipe-card-info-divider">|</span><span class="recipe-card-info">${item.recipe.ingredients.length} ingredients</span>
      <h3 class="recipe-card-source">${item.recipe.source}</h3>`
  );
  displayRecipes(genHTML);
}

// Fetches the search from api.edemame.com
async function fetchRecipes(query) {
    const response = await fetch(`${firstEndpoint}${query}${lastEndpoint}`);
    const data = await response.json();
    const results = data.hits;
    return results;
}

// Sends the search request to fetchRecipes()
async function fetchSubmit(e) {
    e.preventDefault();
    const formButton = e.currentTarget;
  
    // Temporary disable the search button
    formButton.search.disabled = true;
  
    // Fetch and display the results of the searched keyword
    const recipesResults = await fetchRecipes(formButton.keyword.value);
    recipeCardsGen(recipesResults);
  
    // Enable the search button again
    formButton.search.disabled = false;

    return results = [...recipesResults];
}

export { fetchSubmit, fetchRecipe };