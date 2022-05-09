const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();
const {Genre} = require('../db.js')
const {API_KEY}=process.env

// [ ] __GET /genres__:
// - Obtener todos los tipos de géneros de videojuegos posibles
// - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// -

router.get('/',async(req,res,next)=>{
    try {
        const genres=await Genre.findAll();
        if(genres.length===0){ //BD vacia
            const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            for(let i=0;i<response.data.results.length;i++){
                var element=response.data.results[i]
                const genre= await Genre.create({id:element.id,name:element.name})
                genres.push(genre)
            }
        }

        res.status(200).json(genres)
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;