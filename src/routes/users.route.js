import UsersController from '../controllers/users.controller.js';
import express from 'express';

class UsersRouter {
    constructor() {
      this.router = express.Router();
      this.controller = new UsersController();
    }
  
    start() {
      this.router.get("/get", this.controller.getUsers);
      this.router.get("/get/:id", this.controller.getUsersById);
      this.router.post("/add", this.controller.postUser);
      this.router.patch("/patch/:id", this.controller.changeUserMailById);
      this.router.delete("/delete/:id",this.controller.deleteUser)
      
      return this.router;
    }
  }
  
  export default UsersRouter;