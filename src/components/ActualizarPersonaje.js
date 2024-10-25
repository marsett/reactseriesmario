import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ActualizarPersonaje extends Component {
    state = {
        series: [],
        personajes: [],
        serieSeleccionada: null,
        personajeSeleccionado: null,
        estado: false
    }

    cajaSerie = React.createRef();
    cajaPersonaje = React.createRef();

    componentDidMount() {
        this.cargarSeries();
        this.cargarPersonajes();
    }

    cargarSeries = () => {
        const url = Global.apiUrl + "/api/Series";
        axios.get(url).then(response => {
            this.setState({ series: response.data });
        });
    }

    cargarPersonajes = () => {
        const url = Global.apiUrl + "/api/Personajes";
        axios.get(url).then(response => {
            this.setState({ personajes: response.data });
        });
    }

    mostrarDetallesSerie = () => {
        const idSerie = this.cajaSerie.current.value;
        const url = Global.apiUrl + "/api/Series/" + idSerie;
        axios.get(url).then(response => {
            this.setState({ serieSeleccionada: response.data });
        });
    }

    mostrarDetalles = () => {
        const idPersonaje = this.cajaPersonaje.current.value;
        const url = Global.apiUrl+"/api/Personajes/"+idPersonaje;
        axios.get(url).then(response => {
            this.setState({ personajeSeleccionado: response.data });
        });
    }

    modificarPersonaje = (e) => {
        e.preventDefault();
        const idPersonaje = parseInt(this.cajaPersonaje.current.value);
        const idSerie = parseInt(this.cajaSerie.current.value);
        const { nombre, imagen } = this.state.personajeSeleccionado;
        

        const nuevoPersonaje = {
            idPersonaje: idPersonaje,
            nombre: nombre,
            imagen: imagen,
            idSerie: idSerie
        };

        const url = Global.apiUrl + "/api/Personajes/";
        axios.put(url, nuevoPersonaje).then(response => {
            console.log("Personaje modificado");
            this.setState({ estado: true });
        });
    }

    render() {
        if (this.state.estado) {
            return <Navigate to={"/personajes/" + this.cajaSerie.current.value} />;
        }

        return (
            <div>
                <h1>Modificar Personaje</h1>
                <form onSubmit={this.modificarPersonaje}>
                    <label>Serie</label>
                    <select ref={this.cajaSerie} className="form-control" onChange={this.mostrarDetallesSerie}>
                        {this.state.series.map((serie, index) => (
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        ))}
                    </select>
                    <label>Personaje</label>
                    <select ref={this.cajaPersonaje} className="form-control" onChange={this.mostrarDetalles}>
                        {this.state.personajes.map((personaje, index) => (
                            <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-info">Modificar Personaje</button>

                    {this.state.serieSeleccionada && (
                        <div>
                            <h3>{this.state.serieSeleccionada.nombre}</h3>
                            <img src={this.state.serieSeleccionada.imagen} alt={this.state.serieSeleccionada.nombre} style={{ width: '100px', height: 'auto' }} />
                        </div>
                    )}
                    {this.state.personajeSeleccionado && (
                        <div>
                            <h3>{this.state.personajeSeleccionado.nombre}</h3>
                            <img src={this.state.personajeSeleccionado.imagen} alt={this.state.personajeSeleccionado.nombre} style={{ width: '100px', height: 'auto' }} />
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
