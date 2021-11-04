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
        },
        {
          name: "Dairy Free"
        }
    ],{ignoreDuplicates:true}).then(e=>{
      console.log("dietas creadas")
      
    }).catch(err=>{
      console.log(err)
    })

    var pepe =  Recipes.create({
      name: "milanesa a la napo",
      resumen:"a la napo con salsa y queso",
      puntuacion:10,
      level:6,
      image:"https://i.ytimg.com/vi/l1wjqM16g7I/maxresdefault.jpg"
    });
    var pepe1 =  Recipes.create({
      name: "milanesa de carne",
      resumen:"de carne",
      puntuacion:9,
      level:6,
      image:"https://img-global.cpcdn.com/recipes/e3a271511d89f044/400x400cq70/photo.jpg"
      
    });
    var pepe2 =  Recipes.create({
      name: "milanesa de pollo ",
      resumen:"de pollo xD",
      puntuacion:8,
      level:6,
      image:"https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/08/como-cocinar-milanesas-de-pollo-sin-aceite.jpg"
     
    });
    var pepe3=  Recipes.create({
      name:"potato i mean fritas",
      resumen:"son altas fritas",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy352k-oNfCYnb33wl0ktFYbTqeCgS0plelg&usqp=CAU",
      puntuacion:11,
      level:6
      
    })
    Promise.all([pepe,pepe1,pepe2,pepe3])
    .then(res => {
      res[0].setDiets([1])
      res[1].setDiets([1,2])
      res[2].setDiets([1,2,3])
      res[3].setDiets([1,2,3,4])
      console.log("milangas cargadas");
    });
    


  });
});
