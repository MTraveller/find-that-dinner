import { apiPromise } from './apis.js';

function handleError(err) {
    console.log(err);
}

const data = apiPromise.then(response => {
    return response.json();
}).then(result => {
    return result.hits;
}).catch(handleError);

export { data };