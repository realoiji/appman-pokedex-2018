import 'whatwg-fetch';

export const fetchApi = (method, url) => {
  return fetch(url)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      return json;
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
}