import { firstEndpoint, lastEndpoint } from './apis.js';

async function fetchRecipes(query) {
    const response = await fetch(`${firstEndpoint}${query}${lastEndpoint}`);
    const data = await response.json();
    const results = data.hits;
    return results;
}

export { fetchRecipes };