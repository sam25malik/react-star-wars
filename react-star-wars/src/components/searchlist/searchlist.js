import React, { Component } from 'react';
import PlanetInfo from '../planetinfo/planetInfo';
import $ from "jquery";
import './searchList.css';

class SearchList extends Component {
   constructor(props) {
    super(props);
     this.state={
      planetData:'',
      planetComponent:false,
    };
}

  getPlanet(index){
    console.log('getPlanet');
    $('.search').hide();
    $('.planetInfo').show();
    
    let url = this.props.searchData[index].url;
    console.log(url);
    var that = this;
    
    return fetch(url).then(response => {
            return response.json();
    }).then(response => {
        if (response) {
           console.log(response);
           that.setState({
                planetData:response,
                planetComponent:true,
            })
          }
    }).catch(error => console.log('Error fetching data:', error)); 
  }

 handler  = e => {
    console.log(e.target.getAttribute("id"));
    let id = e.target.getAttribute("id");
    this.setState({planetData:''});
    this.getPlanet(id);
    $('.search-list').hide();
   };

    render() {
   	  return (
          <div>
            <center>
            <div className="search-list">
                <ul id="searchList">
                  {this.props.searchData && this.props.searchData.map(function(result, i) {
                  return <li id={i} key={'planet-'+ i} onClick={this.handler} style={{fontSize: result.population.toString().length*3+'px'}}>{result.name}</li>
                  }.bind(this))}
                </ul>
            </div>
            { this.state.planetComponent ? <PlanetInfo planetData={this.state.planetData}/> : null }
           </center>
          </div>

   );
  }
}
export default SearchList;

