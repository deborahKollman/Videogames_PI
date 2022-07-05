import React from "react";
import './styles/About.css'

export default function About(){
    return(
        <div className="about">
            <h2>Acerca de</h2>
            <p>Videogames App es un proyecto individual hecho para Henry Labs, con el fin de crear una aplicacion web, front-end, back-end y base de datos, para probar los conocimientos adquiridos durante el curso.</p>
            <p>Hecho con:</p>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Express</li>
                <li>Sequelize</li>
                <li>PostgreSQL</li>
                <li>API: rawg (https://rawg.io/apidocs)</li>
                <li>Heroku (back-end deploy)</li>
                <li>Vercel (front-end deploy)</li>
            </ul>
            <p>Autor: Deborah Anahi Kollman</p>
            <p>Contacto</p>
            <ul>
                <li><a href="mailto:deborahkollman@gmail.com">Email</a></li>
                <li><a href="https://www.linkedin.com/in/deborah-anahi-kollman-b0977322b/"><p>LinkedIn</p></a></li>
                <li><a href="https://github.com/deborahKollman">GitHub</a></li>
            </ul>
        </div>)
}