import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './components/login/login';
import HomeScreen from './components/home/home';


class App extends Component {
   render() {
      return (
        <Router>
          <Switch>
             <Route path='/home' component={HomeScreen} />
              <Route path='*' component={LoginScreen} />
          </Switch>
        </Router>
   );
  }
}
export default App;
