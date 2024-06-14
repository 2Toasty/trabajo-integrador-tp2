import HeroesServices from "../services/heroes.service.js";

class HeroesController {
    constructor() {
      this.services = new HeroesServices();
    }

    getHeroes = async (req, res) => {
      const Heroes = await this.services.getHeroes();
      res.send(Heroes);
    };
  
    getHeroesById = async (req, res) => {
      const { id } = req.params;
      const Heroes = await this.services.getHeroesById(id);
      res.send(Heroes);
    };

    postHeroe = async (req, res) => {
      const newHeroe = req.body
      const prod = await this.services.postHeroe(newHeroe)
      res.send(prod)
    };
}
  
  export default HeroesController;