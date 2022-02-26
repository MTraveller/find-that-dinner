// Imports, to be used
import { fetchRecipes, fetchResults } from './apis.js';
import { displayRecipes, displaySingleRecipe } from './app.js';
import { body } from './handlers.js';

let fetchedRecipe = [];

function handleError(err) {
  console.log(err);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    [fetchedRecipe.totalNutrients.FAT.label, Math.floor(fetchedRecipe.totalNutrients.FAT.quantity)],
    [fetchedRecipe.totalNutrients.CHOLE.label, Math.floor(fetchedRecipe.totalNutrients.CHOLE.quantity/1000)],
    [fetchedRecipe.totalNutrients.NA.label, Math.floor(fetchedRecipe.totalNutrients.NA.quantity/1000)],
    [fetchedRecipe.totalNutrients.CHOCDF.label, Math.floor(fetchedRecipe.totalNutrients.CHOCDF.quantity)],
    [fetchedRecipe.totalNutrients.PROCNT.label, Math.floor(fetchedRecipe.totalNutrients.PROCNT.quantity)],
  ]);

  // Set chart options
  const options = {
    'title' : 'Recipe nutrients in grams',
    'pieSliceText' : 'value',
    'width' : 400,
    'height' : 300,
    'pieHole' : 0.3,
  };

  // Instantiate and draw the chart, passing in some options.
  const chart = new google.visualization.PieChart(body.querySelector('#google-chart'));
  chart.draw(data, options);
}

// Function to generate the HTML for the clicked recipe
function genRecipe(recipe) {
  console.log('located Recipe');
  console.log(recipe);

  // Grab the info from the recipes array and generate the html for the clicked recipe
  const genRecipeHTML =
    `<span class="close-modal">X</span>
    <article>
     <h2 class="recipe-title">${recipe.label}</h2>
     <figure class="recipe-image"><img src="${recipe.image}" title="${recipe.label}" alt="${recipe.label}"></figure>
     <section>
      <h3>Cuisine: ${recipe.cuisineType}</h3>
      ${(recipe.dietLabels.length === 0 ? '' :
      `${recipe.dietLabels.length === 1 ? `<h3>Diet: ${recipe.dietLabels[0]}</h3>` :
      `<h3>Diet: ${recipe.dietLabels[0]}, ${recipe.dietLabels[1]}</h3>`}`)}
     </section>
     <section>
      <h3>Ingredients:</h3>
      ${(recipe.ingredients.map(idx => `<figure><picture><img loading="lazy" src="${idx.image}" title="${idx.food}" alt="${idx.food}"></picture></figure><h4>${idx.text}</h4>`).join(''))}
     </section>
     <section id="google-chart"></section>
     <section class="share-recipe">
      <h3>Share recipe</h3>
      <figure class="icon"><a href="mailto:?subject=Interesting Recipe&amp;body=Check out this recipe at: ${recipe.url}" title="Share by Email"><img src="./assets/images/email.png"></a><figcaption>Email</figcaption></figure>
      <figure class="icon"><a href="whatsapp://send?text=${recipe.url}" data-action="share/whatsapp/share"><img src="./assets/images/whatsapp.png"></a><figcaption>Whatsapp</figcaption></figure>
     </section>
     <button><a href="${recipe.url}" target="_blank">See recipe on: ${recipe.source}</a></button>
    </article>`
  ;

  // Run displaySingleRecipe from app.js to display the generated recipe
  displaySingleRecipe(genRecipeHTML);
}

// Function to fetch the clicked recipe from the fetched global recipes array
async function fetchRecipe(recipeLabel, data = fetchResults) {
  const fullRecipe = await data.find(item => item.recipe.label === recipeLabel);

  // Store the fetched recipe 
  const recipe = fullRecipe.recipe;

  // Run genRecipe function to generate the clicked recipe
  genRecipe(recipe);

  fetchedRecipe = recipe;
  console.log(fetchedRecipe);
  console.log(typeof fetchedRecipe);
  return fetchedRecipe;
}

// Generate the html for the recipeCards
function recipeCardsGen(recipes) {
  const genCardsHTML = recipes.map(item =>
    `<figure class="recipe-card-image"><img loading="lazy" src="${item.recipe.image}" title="${item.recipe.label}" alt="${item.recipe.label}"></figure>
      <h2 class="recipe-card-title">${item.recipe.label}</h2>
      <span class="recipe-card-cal">${Math.floor(item.recipe.calories)} calories</span><span class="recipe-card-igr">${item.recipe.ingredients.length} ingredients</span>
      <h3 class="recipe-card-source">${item.recipe.source}</h3>`
  );
  // Run displayRecipes function from app.js
  displayRecipes(genCardsHTML);
}

// Sends the search request to fetchRecipes()
function fetchSubmit(e) {
  // Prevent form input default
  e.preventDefault();
  const formButton = e.currentTarget;

  // Temporary disable the search button
  formButton.search.disabled = true;
  
  // Fetch and display the results of the searched keyword
  fetchRecipes(formButton.keyword.value);

  // Enable the search button again
  formButton.search.disabled = false;
}

// Exports, to be used in other JS files
export { handleError, fetchSubmit, fetchRecipe, recipeCardsGen, drawChart };