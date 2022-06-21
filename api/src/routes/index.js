const { Router } = require('express');
const { Op } = require('sequelize')
const axios = require('axios')
const { Recipes, Diets } = require('../db');
const { uploader } = require("../middleware/uploader")
//const API_KEY="5463a2e6f3664850a5d61db26e539e6c"

const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


const getApiRecipe = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${API_KEY}&addRecipeInformation=true`)

    const apiData = await apiUrl.data.results.map(element => {
        return {
            id: element.id,
            name: element.name,
            sourceUrl: element.sourceUrl,
            image: element.image,
            diets: element.diets.map(el => el),
            spoonacularSourceUrl: element.spoonacularSourceUrl
        }
    })
    return apiData

}
const getDatabase = async () => {
    return await Recipes.findAll({
        include: {
            model: Diets,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }
    })
}
router.get("/allrecipe", async (req, res) => {
    // let name=req.query.name
    // const resultApi=await getApiRecipe()
    // const resultDb=getDatabase()
    // let info=resultApi.concat(resultDb)
    // res.send(info)
    const dbdiet = await Diets.findAll({
        include: Recipes
    })
    res.send(dbdiet)

})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipe", async (req, res, next) => {
    let name = req.query.name
    if (name) {
        let reqApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=30&apiKey=${API_KEY}&addRecipeInformation=true`)
        let reqDb = await Recipes.findAll({ //promesa
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            include: {
                model: Diets,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })



        let apiData = await reqApi.data.results.map(element => {
            return {
                id: element.id,
                title: element.title,
                name,
                image: element.image,
                diets: element.diets.map(el => el),
                healthScore: element.healthScore,
                dishTypes: element.dishTypes.map(el => el),
                puntuacion: element.spoonacularScore || 10,

            }
        })
        let result = [...apiData, ...reqDb]
        return res.send(result)
    } else {
        res.status(404).send("name not found")
    }

})
router.get("/recipe/id/:id/flag/:flag", async (req, res) => {
    let id = req.params.id
    let flag = req.params.flag
    if (flag == 0) {
        try {

            const reqApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
            const myinfo = {
                title: reqApi.data.title,
                name: reqApi.data.name,
                diets: reqApi.data.diets,
                steps: reqApi.data.steps,
                healthScore: reqApi.data.healthScore,
                summary: reqApi.data.summary,
                puntuacion: reqApi.data.spoonacularScore,
                dishTypes: reqApi.data.dishTypes,
                analyzedInstructions: reqApi.data.analyzedInstructions[0].steps.map(e => "paso:" + e.number + " " + e.step),
                image: reqApi.data.image
            }

            res.send(myinfo)
        }
        catch (error) {
            res.statusCode(404).send({ name: "lala", summary: "lala" })
        }
        // let array= Object.entries(reqApi.data)
        // array=array.filter(e=>{
        //     if(e[0]==="title"||e[0]==="image"||e[0]==="dishTypes"||e[0]==="diets"||e[0]==="steps"||e[0]==="healthScore"||e[0]==="summary"||e[0]==="spoonacularScore"||e[0]==="analyzedInstructions")return e
        // })
        // let obj=Object.fromEntries(array)
        // obj.analyzedInstructions=obj.analyzedInstructions[0].steps.map(e=>"paso:"+e.number+" "+e.step)



    } else {
        let reqDb = await Recipes.findOne({
            where: {
                id
            },
            include: {
                model: Diets,
                attributes: ["id", "name"],
                through: {
                    attributes: []
                }
            }
        })
        res.json(reqDb)
    }


})
router.get("/types", async (req, res) => {
    let db = await Diets.findAll()
    res.json(db)

})
router.post("/recipe", uploader.single("image"), async (req, res) => {
    file = req.file
    let path = "http://localhost:3000/" + file.filename
    let { name, summary, puntuacion, healthScore, step, diet, dishTypes, title } = req.body
    puntuacion = Number(puntuacion)
    healthScore = Number(healthScore)


    try {
        var [receta, created] = await Recipes.findOrCreate({
            where: {
                name,
                summary
            },
            defaults: {
                puntuacion,
                healthScore,
                step,
                dishTypes,
                title,
                image: path
            }
        })

        var dbdiet = await Diets.findAll({
            where: {
                name: diet
            }
        })
        receta.addDiets(dbdiet)

    } catch (error) {
        console.log(error)
    }


    //await receta.setDiets(diet) ???

    Recipes.findOne({
        where: {
            name
        },
        include: {
            model: Diets,
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }
    }).then(e => {
        res.json(e)
    })

})




module.exports = router;
