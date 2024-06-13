import UsersServices from "../services/users.service.js";

class UsersController {
    constructor() {
      this.services = new UsersServices();
    }

    getUsers = async (req, res) => {
      const Users = await this.services.getUsers();
      res.send(Users);
    };
  
    getUsersById = async (req, res) => {

    };

    postUser = async (req, res) => {
      const newUser = req.body
      const prod = await this.services.postUser(newUser)
      //Solo el controlador maneja la respuesta del servidor
      res.send(prod)
    };
}
  
  export default UsersController;