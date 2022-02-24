import { recipeCardsGen } from './utils.js'

let firstEndpoint = 'https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=';
let lastEndpoint = '&app_id=db107cf3&app_key=fe82b203fb1dcc311c67cd62001244ca&mealType=Dinner&imageSize=REGULAR&random=true';

let fetchResults = [];

// Fetches the search from api.edemame.com
async function fetchRecipes(query) {
  const response = await fetch(`${firstEndpoint}${query}${lastEndpoint}`);
  const data = await response.json();
  const results = data.hits;
  recipeCardsGen(results);

  return fetchResults = [...results];
}

export { fetchRecipes, fetchResults };