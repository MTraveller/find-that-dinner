import { firstEndpoint, lastEndpoint } from './apis.js';
import { displayRecipes } from './scripts.js';

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
    displayRecipes(recipesResults);
  
    // Enable the search button again
    formButton.search.disabled = false;
  }

export { fetchSubmit };