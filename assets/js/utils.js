// Imports, to be used
import { fetchRecipes, fetchResults } from './apis.js';
import { displayRecipes, displaySingleRecipe } from './app.js';
import { body } from './handlers.js';

let fetchedRecipe = [];

function handleError(err) {
  alert('Ooops.. Something went wrong. Reason: ' + err);
}

function genHelp() {
  console.log('generating html');
}

// Function to generate google pie on recipe load
function genGooglePie() {
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    [fetchedRecipe.totalNutrients.FAT.label, Math.floor(Math.ceil(fetchedRecipe.totalNutrients.FAT.quantity)/fetchedRecipe.yield)],
    [fetchedRecipe.totalNutrients.CHOLE.label, Math.floor((Math.ceil(fetchedRecipe.totalNutrients.CHOLE.quantity/1000))/fetchedRecipe.yield)],
    [fetchedRecipe.totalNutrients.NA.label, Math.floor(Math.ceil(fetchedRecipe.totalNutrients.NA.quantity/1000)/fetchedRecipe.yield)],
    [fetchedRecipe.totalNutrients.CHOCDF.label, Math.floor(Math.ceil(fetchedRecipe.totalNutrients.CHOCDF.quantity)/fetchedRecipe.yield)],
    [fetchedRecipe.totalNutrients.PROCNT.label, Math.floor(Math.ceil(fetchedRecipe.totalNutrients.PROCNT.quantity)/fetchedRecipe.yield)],
  ]);

  // Set chart options
  let options = {
    title : `Grams Per Serving Based on ${fetchedRecipe.yield < 1 ? `${fetchedRecipe.yield} Serving` : `${fetchedRecipe.yield} Servings`}`,
    pieSliceText : 'value',
    pieHole : 0.3,
    chartArea : {
      left : 50,
      top : 30,
      width : '100%',
      height : '100%',
    },
  };

  // Instantiate and draw the chart, passing in some options.
  let chart = new google.visualization.PieChart(body.querySelector('#google-chart'));
  chart.draw(data, options);
}

// Function to generate the HTML for the clicked recipe
function genRecipe(recipe) {

  // Grab the info from the recipes array and generate the html for the clicked recipe
  const genRecipeHTML = `
    <div class="close-button"><span class="close-modal">✘</span></div>
     <header class="recipe-header">
      <h2 class="recipe-title">${recipe.label}</h2>
      <section class="recipe-info">
        <figure class="recipe-image"><picture><img src="${recipe.image && `${recipe.image}`}" title="${recipe.label}" alt="${recipe.label}"></picture></figure>
        <div class="recipe-info-details">
          <div class="recipe-pie"><div id="google-chart" style="width: 100%; height: 100%;"></div></div>
          <div class="recipe-type">
            <span><h3>Cuisine: </h3>${recipe.cuisineType}</span>
            ${(recipe.dietLabels.length === 0 ? '' :
            `${recipe.dietLabels.length === 1 ? `<span><h3>Diet: </h3>${recipe.dietLabels[0]}</span>` :
            `<span><h3>Diet: </h3>${recipe.dietLabels[0]}, ${recipe.dietLabels[1]}</span>`}`)}
          </div>
        </div>
      </section>
     </header>
     <section class="recipe-ingredients">
      <h3>Ingredients:</h3>
      ${(recipe.ingredients.map(idx => `<p class="recipe-ingredient">${idx.text}</p>`).join(''))}
     </section>
     <aside class="recipe-links">
      <h3>Recipe links</h3>
      <div class="recipe-share">
        <figure class="icon"><a href="mailto:?subject=Interesting Recipe&amp;body=Check out this recipe at: ${recipe.url}" title="Share by Email"><img src="./assets/images/email.png"></a><figcaption>Email</figcaption></figure>
        <figure class="icon"><a href="whatsapp://send?text=${recipe.url}" data-action="share/whatsapp/share"><img src="./assets/images/whatsapp.png"></a><figcaption>Whatsapp</figcaption></figure>
        <a href="${recipe.url}" target="_blank"><button>See recipe on: ${recipe.source}</button></a>
      </div>
     </aside>`
  ;
  
  // Run displaySingleRecipe in app.js to display the generated recipe
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
  return fetchedRecipe;
}

// Generate the html for the recipeCards
function recipeCardsGen(recipes) {
  const genCardsHTML = recipes.map(item =>
    `<figure class="recipe-card-image"><img loading="lazy" src="${item.recipe.image && `${item.recipe.image}`}" title="${item.recipe.label}" alt="${item.recipe.label}"></figure>
      <h2 class="recipe-card-title">${item.recipe.label}</h2>
      <span class="recipe-card-cal">${Math.floor(item.recipe.calories)} calories</span><span class="recipe-card-igr">${item.recipe.ingredients.length} ingredients</span>
      <h3 class="recipe-card-source">${item.recipe.source}</h3>`
  );
  // Run displayRecipes function from app.js
  displayRecipes(genCardsHTML);
}

// Sends the search request to fetchRecipes()
async function fetchSubmit(e) {
  // Prevent form input default
  e.preventDefault();
  const formButton = e.currentTarget;

  // Temporary disable the search button
  formButton.search.disabled = true;
  
  // Fetch and display the results of the searched keyword
  await fetchRecipes(formButton.keyword.value).catch(handleError);

  // Enable the search button again
  formButton.search.disabled = false;
}

// Exports, to be used in other JS files
export { handleError, fetchSubmit, fetchRecipe, recipeCardsGen, genGooglePie, genHelp };