import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    state = {
        serie: null,
        estado: true
    }

    cargarDetallesSerie = (idSerie) => {
        var url = Global.apiUrl + "api/Series/" + idSerie;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarDetallesSerie(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.cargarDetallesSerie(this.props.id);
        }
    }

    render() {
        return (
            this.state.serie &&
            (
                <div>
                    <img src={this.state.serie.imagen} style={{ width: '250px', height: '250px' }}></img>
                    <h1>{this.state.serie.nombre}</h1>
                    <p>Puntuación: {this.state.serie.puntuacion}</p>
                    <NavLink to={"/personajes/" + this.state.serie.idSerie} className='btn btn-danger'>Personajes</NavLink>
                </div>
            )
        )
    }
}
