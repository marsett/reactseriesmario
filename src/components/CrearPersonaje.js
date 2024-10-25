import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CrearPersonaje extends Component {
    state = {
        series: [],
        estado: false
    }

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSerie = React.createRef();

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

    crearPersonaje = (e) => {
        e.preventDefault();
        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let serie = parseInt(this.cajaSerie.current.value);

        let personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie
        }

        let request = "api/Personajes";
        let url = Global.apiUrl + request;
        axios.post(url, personaje).then(response => {
            console.log("Personaje insertado");
            this.setState({
                estado: true
            })
        })

    }

    render() {
        if (this.state.estado == true) {
            return (
                <Navigate to={"/personajes/" + this.cajaSerie.current.value}></Navigate>
            )
        } else {
            return (
                <div>
                    <h1>Crear personaje</h1>
                    <form onSubmit={this.crearPersonaje}>
                        <label>Nombre</label>
                        <input type="text" ref={this.cajaNombre} className='form-control' />
                        <label>Imagen</label>
                        <input type="text" ref={this.cajaImagen} className='form-control' />
                        <label>Serie</label>
                        <select ref={this.cajaSerie} className='form-control'>
                            {
                                this.state.series.map((serie, index) => {
                                    return (
                                        <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                    )
                                })
                            }
                        </select>
                        <button type='submit' className='btn btn-info'>Crear personaje</button>
                    </form>
                </div>
            )
        }
    }
}
