import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MovieList from './components/MovieList';
import SearchResults from './components/SearchResults';
import Details from './components/Details';


function App() {
  return (
    <Router basename="/"> {/* Add the basename with the base URL */}
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/movies" component={MovieList} />
          <Route path="/tvshows" component={MovieList} />
          <Route path="/search-results" component={SearchResults} />
          <Route path="/movie/:id" component={Details} />
          <Route path="/tv/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
