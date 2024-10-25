import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuNavegacion.css';
import Global from '../Global';
import axios from 'axios';

export default class MenuNavegacion extends Component {

    state = {
        series: [],
        serieSeleccionada: null
    }

    cargarSeries = () => {
        var request = "api/Series";
        var url = Global.apiUrl + request;
        axios.get(url).then(response => {
            response.data.map((serie, index) => (
                this.state.series.push(serie)
            ))
            this.setState({
                series: this.state.series
            })
        })
    }

    componentDidMount = () => {
        this.cargarSeries();
    }

    seleccionarSerie = (serie) => {
        this.setState({
            serieSeleccionada: serie
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                    <div className="container-fluid">
                        <img src="https://appseries.azurewebsites.net/static/media/logo1.1408c71b2c87ca1fb473.png"
                            style={{ width: '80px' }} />


                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fas fa-bars text-light"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <NavLink className="nav-link active" aria-current="page" to="/">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <NavLink className="nav-link active" aria-current="page" to="/create">
                                        Nuevo personaje
                                    </NavLink>
                                </li>
                                <li className="nav-item text-center mx-2 mx-lg-1">
                                    <NavLink className="nav-link active" aria-current="page" to="/update">
                                        Modificar personaje
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown text-center mx-2 mx-lg-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Series
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown" id="listaSeries">
                                        {
                                            this.state.series.map((serie, index) => {
                                                return (
                                                    <li key={index} value={serie.idSerie} className="dropdown-item" onClick={() => this.seleccionarSerie(serie)}>
                                                        <NavLink
                                                            to={"/serie/" + serie.idSerie}
                                                            className="nav-link"
                                                            onClick={() => this.seleccionarSerie(serie)}
                                                        >
                                                            {serie.nombre}
                                                        </NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
