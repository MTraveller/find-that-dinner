// Imports, to be used
import { recipeCardsGen, handleError } from './utils.js';

// Break up the URL from / to the query
let firstEndpoint = 'https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=';
let lastEndpoint = '&app_id=db107cf3&app_key=fe82b203fb1dcc311c67cd62001244ca&mealType=Dinner&imageSize=REGULAR&random=true';

// Save fetch result in a global variable
let fetchResults = [];

// Fetches the search from api.edemame.com
async function fetchRecipes(query) {
  // Fetching query
  const response = await fetch(`${firstEndpoint}${query}${lastEndpoint}`).catch(handleError);
  // Grab the json result
  const data = await response.json();
  // Grab the data needed
  const results = data.hits;
  // Run recipeCardsGen in utils.js
  recipeCardsGen(results);

  // Spread into / make a copy of the results array
  return fetchResults = [...results];
}

// Exports, to be used in other JS files
export { fetchRecipes, fetchResults };