import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as BookAPI from './BooksAPI';

import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';
class BooksApp extends React.Component {
  
  render() {
    return (
      <div>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/search" component={SearchPage} />
      </div>
    );

  }
}

export default BooksApp
