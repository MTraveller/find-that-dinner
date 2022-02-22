import { form } from './handlers.js';

let query = form.addEventListener('submit', function(e) {
    e.preventDefault();
    let query = e.currentTarget.keyword.value;
    return query;
});

export { query };