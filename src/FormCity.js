import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FormCity() {
  const API_KEY = '844a8322bdff6a54c0cb539ba9f0da07'

  const [show, setShow] = useState(false)
  const [city, setCity] = useState('')
  const [cityCode, setCodeCity] = useState('')
  const [data, setData] = useState([])
  const [url, setUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?q=Paris,FR&units=metric&APPID=${API_KEY}&lang=French-fr`)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url)
      setData(result.data)

    };
    fetchData();
  }, [url])



  return (
    < div className='mt-4' >
      <form className="form-row w-50 mx-auto" onSubmit={e => {
        setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city},${cityCode}&units=metric&APPID=${API_KEY}&lang=French-fr`)
        setCity('')
        setCodeCity('')
        { show ? setShow(false) : setShow(true) }
        e.preventDefault()
      }

      }>
        <div className='col'>
          <input type="text" className="form-control" placeholder="Ville" value={city} onChange={e => setCity(e.target.value)} required />
        </div>
        <div className='col'>
          <input type="text" className="form-control" placeholder="Code Ville *" value={cityCode} onChange={e => setCodeCity(e.target.value)} required />
        </div>
        <div className='col'>
          <button className="btn btn-outline-primary">Météo</button>
        </div>
      </form>
      <p className='lead'>* Le code Ville pour la France est FR - les codes se trouvent sur ce <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>tableau</a>, Chapitre --> Current codes, puis la colonne --> Alpha-2 code <br />
        Les noms de Villes en dehors des villes Françaises s'ecrivent en Anglais exemple pour Londres il faut rechercher ville--> London - Code ville --> GB</p>
      <div className="container">
        {console.log(data)}
        {show ? <CardCityUser city={data.name} img={data.weather[0].icon} temp={data.main.temp} tempmax={data.main.temp_max} tempmin={data.main.temp_min} pa={data.main.pressure} wind={data.wind.speed} humidity={data.main.humidity} /> : null}
      </div>
    </div >
  )
}
// 
const CardCityUser = props => (
  <ul className="list-group cardweather w-75 border border-warning mx-auto">
    <li className="list-group-item list-group-item-success">Vous avez choisie la ville de : <strong>{props.city}</strong></li>
    <li className="list-group-item"><img src={`http://openweathermap.org/img/w/${props.img}.png `} alt='icon_weather' /> La température est de : <strong>{props.temp}°C</strong></li>
    <li className="list-group-item list-group-item-success">Pour la journée le maximum prévu sera de : <strong>{props.tempmax}°C</strong> et le minimum de : <strong>{props.tempmin}°C</strong></li>
    <li className="list-group-item">Le vent souffle à <strong>{props.wind} M/s</strong> - La pression Athmosphèrique est de : <strong>{props.pa} hPa</strong></li>
    <li className="list-group-item list-group-item-success">L'humidité est de : <strong>{props.humidity}%</strong></li>
  </ul>
)