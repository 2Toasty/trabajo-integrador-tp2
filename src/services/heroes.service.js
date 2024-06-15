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
      const Heroes = await this.model.getHeroesById(id);
      return Heroes;
    };

    postHeroe = async (heroe) => {
      const result = await this.model.postHeroe(heroe)
      return result
    }; 

    // deleteHero = async (_id) => {
    //   const deleteHero = await this.model.deleteHero(_id);
    //   return deleteHero;
    // }
  }
  
  export default HeroesServices;