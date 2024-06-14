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
      const { id } = req.params;
      const Users = await this.services.getUsersById(id);
      res.send(Users);
    };

    postUser = async (req, res) => {
      const newUser = req.body
      const result = await this.services.postUser(newUser)

      if(result.acknowledged == true){
        console.log("envio un mail")
      }

      res.send(result)
    };
}
  
  export default UsersController;