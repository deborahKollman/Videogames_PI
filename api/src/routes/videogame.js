const { Router } = require('express');
const https =require('https')
const router = Router();
const {Videogame} = require('../db.js');
const {API_KEY}=process.env
const axios=require('axios')


// [ ] __GET /videogame/{idVideogame}__:
// - Obtener el detalle de un videojuego en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// - Incluir los géneros asociados
// - [ ] __POST /videogame__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// - Crea un videojuego en la base de datos

router.get('/:idVideogame',async(req,res,next)=>{
    try {
        const id=req.params.idVideogame;
        if(id.length===36){ //BD
            const videogame=await Videogame.findByPk(id);
            if(videogame!==null){
                res.status(200).json(videogame);
            }else{
                res.status(404).send(`No existe videogame con id ${id}`)
            }
        }else{ //API
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const videogameApi=response.data
            const videogameFilt={id:videogameApi.id,name:videogameApi.name,description:videogameApi.description,released:videogameApi.released, rating:videogameApi.rating, platforms:videogameApi.platforms}
            res.status(200).send(videogameFilt)
        }
    } catch (error) {
        res.status(404).send(`No existe videogame con id ${id}`)
    }
    

})

router.post('/',async(req,res,next)=>{
    
    try {
        const {name,description,released, rating, platforms}=req.body;
        const newVideogame=await Videogame.create({name,description,released, rating, platforms})
        res.status(201).json(newVideogame)
        console.log(typeof newVideogame.id)
    } catch (error) {
        res.status(404).json(`Error: ${error.message}`);
    }
   
})

module.exports = router;