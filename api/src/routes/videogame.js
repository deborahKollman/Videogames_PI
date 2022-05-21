const { Router } = require('express');
const https =require('https')
const router = Router();
const {Videogame,Genre} = require('../db.js');
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
            const videogame=await Videogame.findOne({where:{id:`${id}`},include:Genre});
            if(videogame!==null){
                res.status(200).json(videogame);
            }else{
                res.status(404).send(`No existe videogame con id ${id}`)
            }
        }else{ //API
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const videogameApi=response.data
            const genres=videogameApi.genres.map((elem)=>{return {id:elem.id,name:elem.name}})
            const videogameFilt={id:videogameApi.id,name:videogameApi.name,description:videogameApi.description,released:videogameApi.released, rating:videogameApi.rating, platforms:videogameApi.platforms,genres,image:videogameApi.background_image}
            res.status(200).send(videogameFilt)
        }
    } catch (error) {
        res.status(404).send(`${error}`)
    }
    

})

router.post('/',async(req,res,next)=>{
    
    try {
        var {name,description,image,released, rating, platforms,genres}=req.body;
        const newVideogame=await Videogame.create({name,description,released, rating, platforms,image})
        genres.forEach(element => {
            newVideogame.addGenres(element.id)
        });
        // newVideogame.setGenres(genres);
        res.status(201).send("Juego creado exitosamente")
    } catch (error) {
        res.status(404).send(`ERROR:${error.message}`);
    }
   
})

module.exports = router;