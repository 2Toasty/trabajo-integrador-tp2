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
        res.send({ statuscode: 401, message: "La lista sobre la cual se intento hacer un get se encuentra vacia. Agrege al menos un heroe y vuelva a intentarlo." });
      }
   
    };
  
    getHeroesById = async (req, res) => {
      try {
        const { id } = req.params;
      const hero = await this.services.getHeroesById(id);
      res.send(hero);
      } catch (error) {
        console.log("error :" + error);
        res.send({ statuscode: 401, message: "Id ingresado invalido. Modifique y vuelva a intentarlo." });
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
        res.send({ statuscode: 401, message: "Id ingresado invalido. Modifique y vuelva a intentarlo." });
      }
      
    };

    postHeroe = async (req, res) => {
      
      const newHeroe = req.body
      
      const result = await this.services.postHeroe(newHeroe)
      res.send(result)
    };

    fightRandomHeroe = async (hero) => {
      
      const enemy = await this.heroesApi.getRamdomHeroe();
      const myHeroPower = Math.floor(Math.random() * 600); 

      let result = "Has ganado!";
      if (enemy.power > myHeroPower){
        result = "Has Perdido!";
      }
      return this.getFightMessage(hero, enemy, result);
    }

    getFightMessage(hero,enemy, result ){
      const message = 
      `Tu Heroe : ${hero.nombre}
            VS 
      ${enemy.name}.

      ${result}`;

      return message;
    }
    // deleteHeroe = async (req, res) => {
    //   try {
    //     const { _id } = req.params;
    //     console.log(_id);
    //     const heroDelete = await this.services.deleteHero(_id)
    //     res.send(heroDelete)
    //   } catch (error) {
    //     console.log("error :" + error);
    //     res.send({ statuscode: 401, message: "Id ingresado invalido. Modifique y vuelva a intentarlo." });
    //   }
    
    // }
}
  
  export default HeroesController;
