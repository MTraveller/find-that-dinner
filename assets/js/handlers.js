import { form } from './forms.js';
import { fetchRecipes } from './utils.js';

function displayRecipes(recipes) {
    console.log(recipes);

    const html = recipes.map((item) => {
        const originBaseRecipe = `${item.recipe.url}`;
        const strippedOfHTTP = `${item.recipe.url}`.substring(`${item.recipe.url}`.indexOf(':'));
        const grabHTTP = `${item.recipe.url}`.substring(0, `${item.recipe.url}`.indexOf(':'));
        const fixedHttpUrl = grabHTTP === 'http' ? 'https' + strippedOfHTTP : originBaseRecipe;

        const originalLabel = `${item.recipe.label}`;
        const strippedLabel = `${item.recipe.label}`.substring(0, `${item.recipe.label}`.search(/( -)|( \()|( \{)|( \[)|( \#)\w+/g));
        console.log(originalLabel);
        const fixedLabel = strippedLabel === '' ? originalLabel : strippedLabel;

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

async function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const recipesResults = await fetchRecipes(el.keyword.value);
    displayRecipes(recipesResults);
}

form.addEventListener('submit', handleSubmit);

export { handleSubmit };