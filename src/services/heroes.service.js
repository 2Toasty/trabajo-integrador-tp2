import ModelFactory from "../models/DAO/Factory.js";
import config from "../../config.js";

class HeroesServices {
    constructor() {
      this.model = ModelFactory.get(config.PERSISTENCE).heroes;
    }
  
    getHeroes = async () => {
      const Heroes = await this.model.getHeroes();
      return Heroes;
    };
  
    getHeroesById = async (id) => {

    };

    postHeroe = async (prod) => {
      const Heroe = await this.model.postHeroe(prod)
      return Heroe
    }; 
  }
  
  export default HeroesServices;