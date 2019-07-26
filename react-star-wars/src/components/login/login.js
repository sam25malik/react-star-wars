import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './login.css';

class LoginScreen extends Component {
   constructor(props) {
    super(props);
	
	this.state = {
      userName: '',
      password:'',
      toHome:false
    };
  }

   handleChange = (e) =>{
    e.target.classList.add('active');
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.userName);
    console.log(this.state.password);

  }

  handleSubmit = (e) =>{
    e.preventDefault();
    if (!this.displayError()) {
      console.log('Invalid Form');
    } else {
      this.logIn();
    }
  }

  displayError() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.checkInput(input);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  checkInput(input) {
    const name = input.name;
    const validity = input.validity;
    const label = document.getElementById(`${name}`).placeholder;
    const error = document.getElementById(`${name}Error`);

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      }
      return false;
    }

    error.textContent = '';
    return true;
  }

  logIn(){
    console.log('log in called');
    
    let authenticated = false;
    let username = this.state.userName
    let password = this.state.password;
    var that = this;
    let url = `https://swapi.co/api/people/?search=${username}`;
    return fetch(url).then(response => {
      return response.json();
    }).then(response => {
      console.log('Response: ', response);
      if (response.results) {
      	console.log(response.results);
        let name = response.results[0].name;
        let birthYear = response.results[0].birth_year;
       	if(username.toLowerCase() === name.toLowerCase() && password === birthYear)
      	{
      		authenticated=true;
      		that.setState({ toHome: true })
      		console.log('Log In successfull!');
      	}
      	else
      	{
      		authenticated=false;
      		alert('Invalid Credentials!');
      	}
      }
     return authenticated;
    }).catch(error => console.log('Error fetching data:', error));

  }

   render() {
   	 if (this.state.toHome === true) {
      return <Redirect to={{pathname: "/home", data: this.state.name }}/>
    }
      return (
        <div className="container">
          <div className="box">
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <div className="formStyle">
                <h3 className="heading">
                  Login In
                </h3>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="userName"
                  placeholder="User Name"
                  onChange={this.handleChange}
                  value={this.state.userName}
                  autoFocus
                  required
                    />
                <div className="error" id="userNameError" />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  required />
                <div className="error" id="passwordError" />
                <button className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
   );
  }
}
export default LoginScreen;