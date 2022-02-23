import { form } from './forms.js';
import { handleSubmit } from './handlers.js';

form.addEventListener('submit', handleSubmit);
form.addEventListener('enter', handleSubmit);