import React, { Component, PropTypes } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import Form from '../Form.js'
import NavBar from '../NavBar.js'


class MapBox extends Component {

  state = { reports: [] }

  componentDidMount() {
    //fetching report.json data
    axios.get(`/report/index.json`)
    .then((response) => {
      let reports = response.data;
      this.setState({ reports })
    })
    .catch((error) => { console.log(error) })
    //api key
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3RvbW15NDkiLCJhIjoiY2pqcm1ub3F3OG03dTNxbzZ6ZXJ4NHExaiJ9.4aFNxi2NordCBv36GUI3Mw'
   //initialize map
      var map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-80.2044, 25.8028],
      zoom: [15]
      })
      //navigation
      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'top-right');
      //geolocating
      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      //popup
      let popup = new mapboxgl.Popup()
      .setLngLat([-80.2044, 25.8028])
      .addTo(map);
      //marker
      let marker = new mapboxgl.Marker({
        container: this.container
      })
      .setLngLat([-80.2044, 25.8028])
      .addTo(map);

      map.on('mousemove', function (e) {
        document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
      });

      this.state.reports.map((report => {
        return new mapboxgl.Marker()
        .setLngLat([report.lng, report.lat])
        .addTo(map)
      }))


    }
  render() {
    return (
      <div><br/>
      <div id='info'></div>
      <div className='Map' ref={(x) => { this.container = x }}></div>
      <div style={{backgroundImage: 'url(https://placekitten.com/g/'}} className="Marker" ref={(b) => { this.container = b }}></div>
      </div>
    )
  }
}

export default MapBox