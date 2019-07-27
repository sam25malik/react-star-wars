import React, { Component } from 'react';
import cookie from 'react-cookies';
import SearchList from '../searchlist/searchlist';
import './home.css';


class HomeScreen extends Component {
   constructor(props) {
    super(props);
    var name = cookie.load('user_id');
    console.log(name);
    this.state={
    	name:name,
    	searchValue:'',
    	searchData:'',
    	searchCount:1,
        beginTime:null,
    };
   }

   handleChange = event => {
    
    var time_current = new Date().getTime();
    var time_start = this.state.beginTime;
    var time_diff=time_current-time_start;
    var total_searches = this.state.searchCount;
    var current_user = cookie.load('user_id');

    console.log(total_searches);
    console.log((time_diff/1000));
     if((time_diff/1000) > 60){
      this.setState({
        searchCount: 1,
        beginTime: new Date().getTime(),
      });
      total_searches=1;
      time_start=new Date().getTime();
      time_diff=time_current-time_start;
    }

   	this.setState({
	        searchValue: event.target.value
	      }, () => {
	      if (this.state.searchValue.length > 0) {
	        	 if(current_user=='Luke Skywalker' || total_searches<=15)
    			 {
    	        	this.searchPlanet()
				 }
				 else if(((time_diff/1000)<60) && total_searches>15)
    			 {
      				alert('Only 15 Searches per minute is allowed for this user');
    			 }

			    if(!time_start)
			    {
			      this.setState({
			        beginTime: new Date().getTime()
			      });
			    }

			    total_searches+=1;

			    this.setState({
			      searchCount: total_searches
			    });

			    console.log(this.state.searchCount);
         }
	      else{
	      	this.setState({
	      		searchData:''
	      	})
	      } 
    	})
  }

   searchPlanet(){
    console.log('search planet called');
    
    let planetValue = this.state.searchValue;
    var that = this;
    console.log(planetValue.length);
    
    let url = `https://swapi.co/api/planets/?search=${planetValue}`;
    return fetch(url).then(response => {
      return response.json();
    }).then(response => {
      console.log('Response: ', response);
      if (response.results) {
      	console.log(response.results);
      	that.setState({
      		searchData:response.results
      	})
      	cookie.save('search_results',response.results, { path: '/' });

      }
    }).catch(error => console.log('Error fetching data:', error));

  }

   logOut(){
   	 cookie.remove('user_id', { path: '/' });
      window.location.replace('/');
   }

   render() {
   	  return (
        <div>
	        <div className="headerHome">
	        	<center>
	        	<p>Welcome {this.state.name}</p>
	        	</center>
	        </div>
	        <div className="topcorner">
	        	<a onClick={this.logOut}><p>Log Out</p></a>
	        </div>
	        <center>
	        	<div className="search">
	        		<input type="text"
	          			   className="search-bar"
	          			   placeholder="Search for Planets..."
	                       onChange={this.handleChange}
	                       value={this.state.searchValue}
	        		/>
	        	</div>
			</center>
	        <SearchList 
	        	searchData={this.state.searchData}
	        	/>
        </div>
   );
  }
}
export default HomeScreen;