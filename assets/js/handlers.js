import { fetchRecipes } from './utils.js';

const recipesGrid = document.querySelector('.recipes');

// Function that extracts the info from the returned api response and loops over each item
function displayRecipes(recipes) {
  let cardDivs = recipesGrid.querySelectorAll('.recipe-card');
  console.log(cardDivs);
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
      `<figure class="recipe-card-image"><img src="${item.recipe.images.REGULAR.url}" title="${item.recipe.label}" alt="${item.recipe.label}"></figure>
      <h2 class="recipe-card-title">${fixedLabel}</h2>
      <span class="recipe-card-info">${Math.floor(item.recipe.calories)} calories</span><span class="recipe-card-info-divider">|</span><span class="recipe-card-info">${item.recipe.ingredients.length} ingredients</span>
      <h3 class="recipe-card-source">${item.recipe.source}</h3>`
    )
  });

  // Check cards exists and replace them with new recipes
  if (cardDivs.length === 0) {
    console.log("Doesn't Exists");
    // Iterates through the html array and prints it on the document
    html.forEach(htmlResult => {
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('recipe-card');
      cardDiv.innerHTML = htmlResult;
      recipesGrid.appendChild(cardDiv);
    });
  } else {
    console.log("Exists");
    while ( recipesGrid.firstChild ) recipesGrid.removeChild( recipesGrid.firstChild );
    // Iterates through the html array and prints it on the document
    html.forEach(htmlResult => {
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('recipe-card');
      cardDiv.innerHTML = htmlResult;
      recipesGrid.appendChild(cardDiv);
    });
  }

  
}

// Fetches the search of the keyword the user used
async function handleSubmit(e) {
  e.preventDefault();
  const el = e.currentTarget;
  const recipesResults = await fetchRecipes(el.keyword.value);
  displayRecipes(recipesResults);
}

export { handleSubmit };