/**
 * Google Books API Helpers
 * https://developers.google.com/books/docs/v1/using#PerformingSearch
 */

const apiBase = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=';

// TODO / NOTE: This could by a little more DRY
function searchByIsbn(isbn, index = 0){
    return doSearch(`${apiBase}isbn:${isbn}`, index);
};

function searchByTitle(title, index = 0){
    return doSearch(`${apiBase}intitle:${title}`, index);
};

function searchByAuthor(author, index = 0){
    return doSearch(`${apiBase}inauthor:${author}`, index);
};

function doSearch(api, index) {
    // NOTE: error handling would be good here, but since this is just practice meh
    return fetch(`${api}&startIndex=${index}`)
    .then((resp) => {
        return resp.json().then((data) => {
            return {
                totalItems: data.totalItems,
                items: data.items,
                index: index + 40
            };
        });
    });
}

module.exports = {
    searchByIsbn,
    searchByTitle,
    searchByAuthor
}