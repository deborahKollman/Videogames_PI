const { Router } = require('express');
const router = Router();
const axios=require('axios')
const {Videogame,Genre,Op} =require('../db.js')
const {API_KEY}=process.env
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// - [ ] __GET /videogames__:
//   - Obtener un listado de los videojuegos
//   - Debe devolver solo los datos necesarios para la ruta principal

// [ ] __GET /videogames?name="..."__:
//   - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//   - Si no existe ningún videojuego mostrar un mensaje adecuado


router.get('/',async(req,res,next)=>{
    try {
        if(!req.query.hasOwnProperty("name")){
            var videogames =await Videogame.findAll({include:{model:Genre,as:'genres'}}); //BD
            await recorridoAPI(`https://api.rawg.io/api/games?key=${API_KEY}`,100,videogames) //APi
            res.status(200).json(videogames);
        }else{ //?name=
            const palabra=req.query.name;
            var videogames =await Videogame.findAll({include:{model:Genre,as:'genres',where:{name:{[Op.iLike]:`%${palabra}%`}}}}); //BD
            await recorridoAPI(`https://api.rawg.io/api/games?key=${API_KEY}&search=${palabra}`,15,videogames); //API
            res.status(200).json(videogames);
        }
    } catch (error) {
        res.status(404).send(`ERROR: ${error.message}`)
    }
    
})

const recorridoAPI=async function(url,limite,array){
    
    while(array.length<limite){
        const response= await axios.get(url);
        response.data.results.forEach(videogameApi => {
            if(array.length<limite){
                var genero=videogameApi.map((elem)=>{return {id:elem.id,name:elem.name}})
                array.push({id:videogameApi.id,name:videogameApi.name,description:videogameApi.description,released:videogameApi.released, rating:videogameApi.rating, platforms:videogameApi.platforms,genres:genero})}
        });
        if(response.data.next!==null){url=response.data.next; }
        else{break;}
    }
}

module.exports = router;