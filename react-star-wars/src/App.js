import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './components/login/login';
import HomeScreen from './components/home/home';


class App extends Component {
   render() {
      return (
       <Router>
          <Switch>
               <Route exact path='/' component={LoginScreen} />
               <Route path='/home' component={HomeScreen} />
          </Switch>
       </Router>
   );
  }
}
export default App;
