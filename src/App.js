import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import CardWeather from './CardWeather'
import FormCity from './FormCity'
import { Footer } from './Footer'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      currentLatLon: {
        lat: 0,
        lon: 0
      }
    }

  }

  componentDidMount() {
    this.getGeolocation()
  }

  getDate() {
    let theDate = new Date()
    let months = ["Jan", "Fev", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Dec"];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let year = theDate.getFullYear()
    let month = months[theDate.getMonth()]
    let day = days[theDate.getDay()]
    let nday = theDate.getDate()

    let today = `${day} ${nday} ${month} ${year}.`
    return today
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.setState({
          currentLatLon: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        })

        const API_KEY = '844a8322bdff6a54c0cb539ba9f0da07'
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.currentLatLon.lat}&lon=${this.state.currentLatLon.lon}&units=metric&APPID=${API_KEY}&lang=French-fr`)
          .then(res => {
            const imgId = res.data.weather[0].icon
            const urlImg = `http://openweathermap.org/img/w/${imgId}.png`
            return (
              <div className='mt-5'>
                <CardWeather header={this.getDate()} city={res.data.name} icon={urlImg} temp={res.data.main.temp} wind={res.data.wind.speed} pa={res.data.main.pressure} humidity={res.data.main.humidity} />

              </div>
            )
          })
          .then(newData => this.setState({ data: newData }))
          .catch(error => `He is a problem ${error.message}`)
      })
    } else {
      return error => console.log(error)
    }
  }



  render() {
    return (
      <div>
        <div className="App container">
          <h1 className='text-warning my-3'><em>WEATHER React App</em></h1>
          {this.state.data}
          <hr className='my-5' />
          <FormCity />

        </div>
        <Footer />
      </div>
    );
  }
}

