//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn,Recipes,Diets } = require('./src/db.js');
const { Sequelize } = require('sequelize');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3000, () => {
    console.log('%s listening at 3000'); // eslint-disable-line no-console
     Diets.bulkCreate([
      {
       name:"Gluten Free"
      },
        {
          name:"Ketogenic"
        },
        {
          name:"Vegetarian"
        },
        {
          name:"Lacto-Vegetarian"
        },
        {
          name:"Ovo-Vegetarian"
        },
        {
          name:"Vegan"
        },
        {
          name:"Pescetarian"
        },
        {
          name:"Paleo"
        },
        {
          name:"Primal"
        },
        {
          name:"Low-FODMAP"
        },
        {
          name:"Whole30"
        }
    ]).then(e=>{
      console.log("dietas creadas")
      
    }).catch(err=>{
      console.log(err)
    })

    var pepe =  Recipes.create({
      name: "milanesa",
      resumen:"de pollo o carne",
      diets:[{
        name:"Primal"
      }]},{
        include: Diets
      
    });
    var pepe1 =  Recipes.create({
      name: "milanesa de carne",
      resumen:"de carne",
      diets:[{
        name:"Paleo"
      }]},{
        include : Diets
    });
    var pepe2 =  Recipes.create({
      name: "milanesa de pollo ",
      resumen:"de pollo xD",
      diets:[{
        name:"Primal"
      }]},{
        include : Diets
    });
    var pepe3=  Recipes.create({
      name:"potato i mean fritas",
      resumen:"son altas fritas",
      diets:[{
        name:"Vegan"
      }]},{
      include: Diets
    })
    Promise.all([pepe,pepe1,pepe2,pepe3])
    .then(res => {
      console.log("milangas cargadas");
    });


  });
});
