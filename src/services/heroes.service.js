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
    const result = await this.model.postHeroe(heroe);
    return result;
  };

  deleteHeroe = async (id) => {
    const deleteHero = await this.model.deleteHeroe(id);
    return deleteHero;
  };

  deleteAllHeroes = async () => {
    const result = await this.model.deleteAllHeroes();
    return result;
  };
}

export default HeroesServices;
