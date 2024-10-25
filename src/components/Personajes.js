import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    state = {
        personajes: [],
        estado: true
    }

    cargarPersonajes = (idSerie) => {
        var url = Global.apiUrl + "api/Series/PersonajesSerie/" + idSerie;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarPersonajes(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.cargarPersonajes(this.props.id);
        }
    }

    render() {
        return (
            <div>
                <h1>Personajes de {this.props.id}</h1>
                <NavLink to={"/serie/" + this.props.id}>
                    <button>Volver a serie</button>
                </NavLink>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody id="tablaPersonajes">
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td>
                                            <img src={personaje.imagen} style={{width: '100px', height: '100px'}}></img></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}
