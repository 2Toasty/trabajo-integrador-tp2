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
      res.status(201).send(
        `Felicidades!! se agrego a ${newHeroe.nombre} a la lista de HEROES`
      );
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

  changeHeroNameById = async (req,res) => {
    try{
      const { id } = req.params;
      const newName = req.body;
      const nuevoNombre = await this.services.changeHeroNameById(id,newName);
      res.send(nuevoNombre)
    } catch(error){
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message:
          "El Id ingresado no es válido o el Nombre ingresado no tiene formato válido",
      });
    }
  }

  deleteHeroe = async (req, res) => {
    try {
      const { _id } = req.params;
      const heroDelete = await this.services.deleteHeroe(_id);
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
}

export default HeroesController;
