const { Router } = require('express');
const {Op} = require('sequelize')
const axios = require('axios')
const {Recipes, Diets} = require('../db');
const API_KEY="5463a2e6f3664850a5d61db26e539e6c"

//const API_KEY="4dc38c6d0f754ba4b183daa9c51d6162"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


const getApiRecipe=async()=>{
    const apiUrl=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${API_KEY}&addRecipeInformation=true`)
    
    const apiData= await apiUrl.data.results.map(element=>{
        return{
            id:element.id,
            name:element.name,
            sourceUrl:element.sourceUrl,
            image:element.image,
            diets:element.diets.map(el=>el),
            spoonacularSourceUrl:element.spoonacularSourceUrl
        }
    })
    return apiData

}
const getDatabase=async()=>{
    return await Recipes.findAll({
        include:{
            model:Diets,
            attributes:["id","name"],
            through:{
                attributes:[]
            }
        }
    })
}
router.get("/allrecipe",async(req,res)=>{
    // let name=req.query.name
    // const resultApi=await getApiRecipe()
    // const resultDb=getDatabase()
    // let info=resultApi.concat(resultDb)
    // res.send(info)
    const dbdiet=await Diets.findAll({
       include:Recipes
    })
    res.send(dbdiet)

})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipe",async(req,res,next)=>{
    let name=req.query.name
    if(name){
        let reqApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=30&apiKey=${API_KEY}&addRecipeInformation=true`)
        let reqDb=await Recipes.findAll({ //promesa
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            include:{
                model:Diets,
                attributes:["name"],
                through:{
                    attributes:[],
                }
            }
        })
        
          
       console.log(reqDb)
       
        let apiData= await reqApi.data.results.map(element=>{
            return{
                id:element.id,
                title:element.title,
                name,
                sourceUrl:element.sourceUrl,
                image:element.image,
                diets:element.diets.map(el=>el),
                spoonacularSourceUrl:element.spoonacularSourceUrl
            }
        })
        let result=[...apiData,...reqDb]
        return res.send(result)
    }else{
        res.status(404).send("name not found")
    }
    
})
router.get("/recipe/id/:id",async(req,res)=>{
    let id=req.params.id
    const reqApi= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
    let array= Object.entries(reqApi.data)
    array=array.filter(e=>{
        if(e[0]==="title"||e[0]==="image"||e[0]==="dishTypes"||e[0]==="diets"||e[0]==="steps"||e[0]==="healthScore"||e[0]==="summary"||e[0]==="spoonacularScore")return e
    })
    let obj=Object.fromEntries(array)
    res.send(obj)

})
router.get("/types",async(req,res)=>{
    let db= await Diets.findAll()
    res.json(db)
      
})
router.post("/recipe",async(req,res)=>{
    const {name,resumen,puntuacion,level,image,step,diet}=req.body

    var [receta,created]= await Recipes.findOrCreate({
        where:{
            name,
            resumen
        },
        defaults:{
            puntuacion,
            level,
            step,
            image
        }
    })

    var dbdiet=await Diets.findAll({
        where:{
            id:diet
        }
    })
    receta.addDiets(dbdiet)
    //await receta.setDiets(diet) ???
     
    Recipes.findOne({
        where:{
            name
        },
        include:{
            model:Diets,
            attributes:["id","name"],
            through:{
                attributes:[]
            }
        }
    }).then(e=>{
        res.json(e)
    })
    
})




module.exports = router;
