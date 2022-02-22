import { form } from './forms.js';
import { fetchRecipes } from './utils.js';

async function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const recipes = await fetchRecipes(el.keyword.value)
    console.log(recipes);
}

form.addEventListener('submit', handleSubmit);

export { handleSubmit };