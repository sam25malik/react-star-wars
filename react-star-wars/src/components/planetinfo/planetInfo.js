import React, { Component } from 'react';
import $ from "jquery";
import './planetInfo.css';

class PlanetInfo extends Component {
   constructor(props) {
    super(props);
    //console.log(this.props.results);
}

close()
{
    $('.search-list').show();
    $('.search').show();
    $('.planetInfo').hide();
       
}

   render() {
   	  return (
        <div className="planetInfo">
        <button id="close" className="btn" onClick={this.close}><i className="fa fa-close"></i> Close</button>
        <h2 className="planetInfo-header">{this.props.planetData.name}</h2>
        <p className="planet-para">Diameter: {this.props.planetData.diameter}</p>
        <p className="planet-para">Climate: {this.props.planetData.climate}</p>
        <p className="planet-para">Gravity: {this.props.planetData.gravity}</p>
        <p className="planet-para">Population: {this.props.planetData.population}</p>
        <p className="planet-para">Rotation Period: {this.props.planetData.rotation_period}</p>
        <p className="planet-para">Terrain: {this.props.planetData.terrain}</p>
        </div>
   );
  }
}
export default PlanetInfo;