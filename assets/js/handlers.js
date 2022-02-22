import { form } from './forms.js';
import { displayRecipes } from './utils.js';

async function handleSubmit(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const recipes = await displayRecipes(el.keyword.value)
    console.log(recipes);
}

form.addEventListener('submit', handleSubmit);

export { handleSubmit };