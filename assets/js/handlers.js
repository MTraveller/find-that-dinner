import { form } from './forms.js';
import { fetchRecipes } from './utils.js';

// Function that extracts the info from the returned api response and loops over each item
function displayRecipes(recipes) {
    console.log(recipes);

    const html = recipes.map((item) => {

        // Grab the original website url where recipe is
        const originBaseRecipe = `${item.recipe.url}`;
        // Exract letters leading up to : of the url
        const strippedOfHTTP = `${item.recipe.url}`.substring(`${item.recipe.url}`.indexOf(':'));
        // Grab all letters up to : of the url
        const grabHTTP = `${item.recipe.url}`.substring(0, `${item.recipe.url}`.indexOf(':'));
        // Check if url has http and change it to https
        const fixedHttpUrl = grabHTTP === 'http' ? 'https' + strippedOfHTTP : originBaseRecipe;

        // Extract the label and check for unwanted charecters like -, (, { or # and strip out from their point to the end of the array
        const originalLabel = `${item.recipe.label}`;
        const strippedLabel = `${item.recipe.label}`.substring(0, `${item.recipe.label}`.search(/( -)|( \()|( \{)|( \[)|( \#)\w+/g));
        const fixedLabel = strippedLabel === '' ? originalLabel : strippedLabel;
        
        // Create the html for the individual recipe
        return (
            `<div>
            <h2>${fixedLabel}</h2>
            <figure><img src="${item.recipe.images.REGULAR.url}" alt="${item.recipe.label}"></figure>
            <a href="${fixedHttpUrl}">
            <p>${item.recipe.ingredientLines}</p>
            </div>`
        )
    });
    console.dir(html);
}

// Fetches the search of the keyword the user used
async function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const recipesResults = await fetchRecipes(el.keyword.value);
    displayRecipes(recipesResults);
}

export { handleSubmit };