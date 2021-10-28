const { Router } = require('express');
const {Op} = require('sequelize')
const axios = require('axios')
const {Recipes, Diets} = require('../db');
const API_KEY="4dc38c6d0f754ba4b183daa9c51d6162"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipe",(req,res,next)=>{
    let name=req.query.name
    let apipromise
    let dbpromise
    if(name){
        apipromise=axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`)
        dbpromise=Recipes.findAll({ //promesa
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            include:{
                model:Diets
            }
        })
    }
    Promise.all([apipromise,dbpromise])
    .then((respuesta)=>{
        const[resApi,resDb]=respuesta
        let arrayresult=resApi.data.results
        let aux=arrayresult.map(a=>{

            let array=Object.entries(a)
            array=array.filter(e=>{
                if(e[0]==="id"||e[0]==="title"||e[0]==="readyInMinutes"||e[0]==="sourceUrl"||e[0]==="image"||
                e[0]==="summary"||e[0]==="dishTypes"||e[0]==="diets"||e[0]==="spoonacularSourceUrl") return true
            })
            let obj=Object.fromEntries(array)

            return obj

        })

        let allrecipes=[...aux,...resDb]
        res.send(allrecipes)
    }).catch(error=>next(error))
})
router.get("/recipe/id/:id",async(req,res)=>{
    let id=req.params.id
    let recipepromise= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
    let {title,readyInMinutes,servings,sourceUrl,image,imageType,summary,diets}=recipepromise.data
    let idc=recipepromise.data.id
    let obj={idc,title,readyInMinutes,servings,sourceUrl,image,imageType,summary,diets}
    res.send(obj)

})
router.get("/types",async(req,res)=>{
    let db= await Diets.findAll({raw:true})
    res.send(db)
      
})
router.post("/recipe",async(req,res)=>{
    const {name,resumen,puntuacion,level,step,diet}=req.body

    var [receta,created]= await Recipes.findOrCreate({
        where:{
            name,
            resumen
        },
        default:{
            puntuacion,
            level,
            step
        }
    })
    await receta.setDiets(diet)
     
    Recipes.findOne({
        where:{
            name
        },
        include:Diets
    }).then(e=>{
        res.json(e)
    })
    
})




module.exports = router;
