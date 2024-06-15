import HeroesServices from "../services/heroes.service.js";
import HeroesApi from "../models/HeroesApi.js";

class HeroesController {
    constructor() {
      this.services = new HeroesServices();
      this.heroesApi = new HeroesApi();
    }
    
    getHeroes = async (req, res) => {
      const heroes = await this.services.getHeroes();
      res.send(heroes);
    };
  
    getHeroesById = async (req, res) => {
      const { id } = req.params;
      const hero = await this.services.getHeroesById(id);
      res.send(hero);
    };

    fightWithHeroe = async (req, res) => {
      const { id } = req.params;

      const hero = await this.services.getHeroesById(id);

      const result = await this.fightRandomHeroe(hero);

      res.send(result);
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
}
  
  export default HeroesController;