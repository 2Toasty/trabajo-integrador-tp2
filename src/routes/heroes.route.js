import HeroesController from "../controllers/heroes.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new HeroesController();
    }
  
    start() {
      this.router.get("/heroes", this.controller.getHeroes);
      this.router.get("/heroes/:id", this.controller.getHeroesById);
      this.router.post("/heroes", this.controller.postHeroe);

      return this.router;
    }
  }
  
  export default Router;