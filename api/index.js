const server = require("./src/app.js");
const { conn, Recipes, Diets } = require("./src/db.js");
require("dotenv").config();
const port = process.env.PORT || 3000;
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    Diets.bulkCreate(
      [
        { name: "Gluten Free" },
        { name: "Ketogenic" },
        { name: "Vegetarian" },
        { name: "Lacto-Vegetarian" },
        { name: "Ovo-Vegetarian" },
        { name: "Vegan" },
        { name: "Pescatarian" },
        { name: "Paleolithic" },
        { name: "Primal" },
        { name: "Low-FODMAP" },
        { name: "Whole 30" },
        { name: "Dairy Free" },
        { name: "lacto ovo vegetarian" },
      ],
      { ignoreDuplicates: true }
    )
      .then((e) => {
        console.log("dietas creadas");
      })
      .catch((err) => {
        console.log(err);
      });

    var pepe = Recipes.create({
      name: "milanesa",
      title: "Milanesa a la Napolitana",
      summary: "a la napo con salsa y queso",
      puntuacion: 10,
      healthScore: 8,
      image: "https://i.ytimg.com/vi/l1wjqM16g7I/maxresdefault.jpg",
    });
    var pepe1 = Recipes.create({
      name: "milanesa",
      title: "Milanesa de Carne",
      summary: "de carne",
      puntuacion: 9,
      healthScore: 6,
      image:
        "https://img-global.cpcdn.com/recipes/e3a271511d89f044/400x400cq70/photo.jpg",
    });
    var pepe2 = Recipes.create({
      name: "milanesa",
      title: "Milanesa de Pollo",
      summary: "de pollo xD",
      puntuacion: 8,
      healthScore: 2,
      image:
        "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/08/como-cocinar-milanesas-de-pollo-sin-aceite.jpg",
    });
    var pepe3 = Recipes.create({
      name: "potato",
      title: "Papas Fritas",
      summary: "son altas fritas",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy352k-oNfCYnb33wl0ktFYbTqeCgS0plelg&usqp=CAU",
      puntuacion: 11,
      healthScore: 6,
    });
    Promise.all([pepe, pepe1, pepe2, pepe3]).then((res) => {
      res[0].setDiets([1]);
      res[1].setDiets([1, 2]);
      res[2].setDiets([1, 2, 3]);
      res[3].setDiets([1, 2, 3, 4]);
      console.log("milangas cargadas");
    });
  });
});
