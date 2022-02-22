import { firstEndpoint, lastEndpoint } from './apis.js';

async function displayRecipes(query = 'chicken') {
    const endpoint = `${firstEndpoint}${query}${lastEndpoint}`;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    const results = data.hits;
    console.log(results);
}

export { displayRecipes };