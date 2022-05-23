import React from "react";
import './styles/About.css'

export default function About(){
    return(
        <div className="about">
            <h2>Acerca de</h2>
            <p>Videogames App es un proyecto individual hecho para Henry Labs, con el fin de crear una aplicacion web, front-end, back-end y base de datos, para probar los conocimientos adquiridos durante el curso.</p>
            <p>Autor: Kollman, Deborah</p>
            <p>Hecho con:</p>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Express</li>
                <li>Sequelize</li>
                <li>Postgress</li>
                <li>API: rawg (https://rawg.io/apidocs)</li>
                <li>Heroku (back-end deploy)</li>
                <li>Vercel (front-end deploy)</li>
            </ul>
        </div>)
}