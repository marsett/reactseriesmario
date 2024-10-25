import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MenuNavegacion from './MenuNavegacion';
import Home from './Home';
import CrearPersonaje from './CrearPersonaje';
import ActualizarPersonaje from './ActualizarPersonaje';
import Serie from './Serie';
import Personajes from './Personajes';

export default class Router extends Component {
    render() {
        function SerieComponentElement() {
            let { id } = useParams();
            return (
                <Serie id={id} />
            )
        }
        function PersonajeComponentElement() {
            let { id } = useParams();
            return (
                <Personajes id={id} />
            )
        }
        return (
            <BrowserRouter>
                <MenuNavegacion />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/create" element={<CrearPersonaje/>}></Route>
                    <Route path="/update" element={<ActualizarPersonaje/>}></Route>
                    <Route path="/serie/:id" element={<SerieComponentElement/>}></Route>
                    <Route path="/personajes/:id" element={<PersonajeComponentElement/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
