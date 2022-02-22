const endpoint = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=db107cf3&app_key=fe82b203fb1dcc311c67cd62001244ca&mealType=Dinner&imageSize=REGULAR';

const apiPromise = fetch(endpoint);

export { apiPromise };