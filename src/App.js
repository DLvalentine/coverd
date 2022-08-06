/** @jsxImportSource @emotion/react */

// NOTE: IRL I'd break these out onto newlines and keep them alphabetized.
import {Typography, Container, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as bookAPI from './lib/google-books-api';
import BookList from './components/BookList';

// NOTE: Normally App would be a landing page, and there'd be more parts of it in components/, but this is practice.
// NOTE: Yeah there's a mix of inline style, random css in index.css, and emotion/react, but I'm just goofin
// TODO: Nice to have -> search combination. e.g. title+author
// TODO: Nice to have -> url params for search
function App() {
  const defaultBookData = {items: [], totalItems: 0, index: 0};
  const defaultSearchType = 'title';
  let lastIndex = 0;

  const [bookData, setBookData] = useState(defaultBookData);
  const [searchType, setSearchType] = useState(defaultSearchType);

  useEffect(() => {
    lastIndex = bookData.index - 80; // NOTE: Weird offset math, if I was writing this for real I'd make it better. Needs to be offset by 80 to make the 'prev' button work.
  });

  return (
    <div css={css`
      margin: 10px;
    `}>
      <Container id="app-container">
        <div id="nav-and-search">
          <Link id="nav" to="/" onClick={() => resetSearch(defaultBookData, defaultSearchType, setBookData, setSearchType)}><Typography variant="h4" css={css`text-decoration: underline;`}>Cover'd</Typography></Link>

          <div id="search-form" css={css`display: flex; flex-direction: row; gap: 100px;`}>
            <span css={css`margin-top: 10px;`}>
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select labelId="search-type-label" id='search-type-select' value={searchType} onChange={(e) => {setSearchType(e.target.value)}}>
                <MenuItem value="isbn">ISBN</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
              </Select>
            </span>
            <span css={css`align-self: center;`}>
              <TextField id="search" label="Search Text" variant="standard" css={css`width: 40vw;`} onKeyDown={(e) => handleKeyboardEvt(e, searchType, setBookData)}/>
            </span>
            <span css={css`margin-top: 10px; align-self: center;`}>
              <Button style={{width: 150}} variant="contained" onClick={() => doSearch(searchType, setBookData)}>Search</Button>
            </span>
            <span css={css`margin-top: 10px; align-self: center;`}>
              <Button style={{width: 100}} variant="contained" color="error" onClick={() => resetSearch(defaultBookData, defaultSearchType, setBookData, setSearchType)}>Reset</Button>
            </span>
          </div>

        </div>
        <div css={css`margin-top: 25px;`}>
          {bookData.items.length ? <p>Books Found: {bookData.totalItems} (Updates along with pagination, as search increases)</p> : null}
          {bookData.items.length ? <p css={css`margin-bottom: 10px;`}>Hover over a book to see its title.</p> : null}
          
          <div style={{display: 'flex'}}>
            {bookData.index > 40 ? <Button onClick={() => doSearch(searchType, setBookData, lastIndex)} style={{marginRight: '10px'}} variant="outlined">Previous Page</Button> : null}
            {bookData.totalItems > 40 ? <Button onClick={() => doSearch(searchType, setBookData, bookData.index)} variant="outlined">Next Page</Button> : null}
          </div>

          {bookData.items.length ? <BookList books={bookData.items}/> : null }
        </div>
      </Container>
    </div>
  );
}

function handleKeyboardEvt(e, type, callback) {
  if(e.key === 'Enter') {
    doSearch(type, callback);
  }
};

function doSearch(type, callback, index = 0) {
  const searchText = document.querySelector('#search').value;

  switch(type) {
    case 'isbn':
      bookAPI.searchByIsbn(searchText, index).then(data => callback(data));
      break;
    case 'title':
      bookAPI.searchByTitle(searchText, index).then(data => callback(data));
      break;
    case 'author':
      bookAPI.searchByAuthor(searchText, index).then(data => callback(data));
      break;
    default:
      alert('Something strange happened, not sure how ya got here. Refresh and try again.');
  }
};

function resetSearch(defaultBookData, defaultSearchType, bookCallback, searchCallback) {
  document.querySelector('#search').value = '';
  bookCallback(defaultBookData);
  searchCallback(defaultSearchType);
};

export default App;
