import HeroesServices from "../services/heroes.service.js";
import HeroesApi from "../models/HeroesApi.js";

class HeroesController {
  constructor() {
    this.services = new HeroesServices();
    this.heroesApi = new HeroesApi();
  }

  getHeroes = async (req, res) => {
    try {
      const heroes = await this.services.getHeroes();
      res.send(heroes);
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message:
          "La lista sobre la cual se intento hacer un get se encuentra vacia. Agrege al menos un heroe y vuelva a intentarlo.",
      });
    }
  };

  getHeroesById = async (req, res) => {
    try {
      const { id } = req.params;
      const hero = await this.services.getHeroesById(id);
      res.send(hero);
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message: "Id ingresado invalido. Modifique y vuelva a intentarlo.",
      });
    }
  };

  fightWithHeroe = async (req, res) => {
    const { id } = req.params;
    try {
      const hero = await this.services.getHeroesById(id);

      const result = await this.fightRandomHeroe(hero);

      res.send(result);
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message: "Id ingresado invalido. Modifique y vuelva a intentarlo.",
      });
    }
  };

  postHeroe = async (req, res) => {
    try {
      const newHeroe = req.body;
      const result = await this.services.postHeroe(newHeroe);
      res.status(201).send({
        message: `Felicidades!! Se agregó a ${result.nombre} a la lista de HÉROES`,
        nombre: result.nombre,
        id: result.id
      });
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message: "Error: Nombre ingresado con formato invalido.",
      });
    }
  };

  fightRandomHeroe = async (hero) => {

    const enemy = await this.heroesApi.getRamdomHeroe();
    const myHeroPower = Math.floor(Math.random() * 600);

    let result = "Has ganado!";
    if (enemy.power > myHeroPower) {
      result = "Has Perdido!";
    }
    return this.getFightMessage(hero, enemy, result);
  };

  getFightMessage(hero, enemy, result) {
    const message = `Tu Heroe : ${hero.nombre}
            VS 
      ${enemy.name}.

      ${result}`;

    return message;
  }

  deleteHeroe = async (req, res) => {
    try {
      const { id } = req.params;
      const heroDelete = await this.services.deleteHeroe(id);
      res.send(`OPERACION EXITOSA!! Se elimino de forma satisfactoria`);
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message:
          "Id ingresado no se encuentra en la lista y por ende no se pudo eliminar",
      });
    }
  };

  deleteAllHeroes = async (req, res) => {
    try {
      const result = await this.services.deleteAllHeroes();
      res.send(`OPERACION EXITOSA!! Se eliminaron ${result.deletedCount} héroes de la lista.`);
    } catch (error) {
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message: "Error al intentar eliminar todos los héroes. Vuelva a intentarlo.",
      });
    }
  };

}

export default HeroesController;
