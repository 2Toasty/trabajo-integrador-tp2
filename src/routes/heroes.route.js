import HeroesController from "../controllers/heroes.controller.js";
import express from 'express';

class HeroesRouter {
    constructor() {
      this.router = express.Router();
      this.controller = new HeroesController();
    }
  
    start() {
      this.router.get("/get", this.controller.getHeroes);
      this.router.get("/get/:id", this.controller.getHeroesById);
      this.router.get("/fight/:id", this.controller.fightWithHeroe);
      this.router.post("/add", this.controller.postHeroe);
      //this.router.delete("/delete/:id", this.controller.deleteHeroe);

      return this.router;
    }
  }
  
  export default HeroesRouter;