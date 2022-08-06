import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Book from './routes/Book';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/book">
          <Route path=":isbn" element={<Book />}/>
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
