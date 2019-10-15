import React, { Component } from 'react';

export default class CardWeather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      className: 'alert alert-warning w-100 mx-auto d-none'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ className: 'alert alert-warning w-100 mx-auto d-block' })

    setTimeout(() => {
      this.setState({ className: 'alert alert-warning w-100 mx-auto d-none' })
    }, 6500)

  }
  render() {
    return (
      <div className="card text-center mx-auto border border-danger cardweather" style={{ maxWidth: '680px' }}>
        <div className="card-header">
          {this.props.header}
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.city}</h5>
          <p className="card-text"><img src={this.props.icon} alt='icon_weather' />
            <strong>{this.props.temp}°C</strong>
          </p>
          <p className='card-text'>Vitesse du vent : <strong>{this.props.wind} M/s</strong> - Pression Athmosphérique <strong>{this.props.pa}  hPa</strong> - <span>L'humidité est de <strong>{this.props.humidity}%</strong> </span></p>
          <button type='button' className="btn btn-outline-info mt-3" onClick={this.handleClick}>Message</button>
        </div>
        <div className="card-footer text-muted">
          Géolocalisation
  </div>
        <AlertMessage classperso={this.state.className} />
      </div>
    )
  }

}

export const AlertMessage = props => (
  <div className={props.classperso} role='alert'>
    <h6 className="alert-heading">Vous pouvez, aussi, obtenir la météo d'une ville choisie en remplissant le formulaire ci dessous</h6>

  </div>
)