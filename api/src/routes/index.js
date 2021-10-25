const { Router } = require('express');
const {Op} = require('sequelize')
const axios = require('axios')
const {Recipe, Diet} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipe",(req,res)=>{
    let name=req.query.name
    let recipepromise
    if(name){
        recipepromise=axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
    }

})


module.exports = router;
