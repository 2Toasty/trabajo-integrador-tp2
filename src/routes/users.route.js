import UsersController from '../controllers/users.controller.js';
import express from 'express';

class UsersRouter {
    constructor() {
      this.router = express.Router();
      this.controller = new UsersController();
    }
  
    start() {
      this.router.get("/users", this.controller.getUsers);
      this.router.get("/users/:id", this.controller.getUsersById);
      this.router.post("/users", this.controller.postUser);

      return this.router;
    }
  }
  
  export default UsersRouter;