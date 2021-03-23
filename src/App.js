import './App.css';
import React from 'react';
import Login from './components/login'
import Register from './components/register'
import SearchHistory from './components/searchHistory'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DrinksList from './components/drinksList';


function App() {
  localStorage.setItem('url', 'http://localhost:3001')
  return (
    <div className='App container'>
      <Router>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/drinksList'>
            <DrinksList />
          </Route>
          <Route path='/searchHistory'>
            <SearchHistory />
          </Route>
          <Route path='/'>
            <Login />
          </Route>

        </Switch>
      </Router>
    </div>
  )

}

export default App;
