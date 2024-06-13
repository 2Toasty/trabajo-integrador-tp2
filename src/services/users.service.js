import ModelFactory from "../models/DAO/Factory.js";
import config from "../../config.js";

class UsersServices {
    constructor() {
      this.model = ModelFactory.get(config.PERSISTENCE);
    }
  
    getUsers = async () => {
      const Users = await this.model.getUsers();
      return Users;
    };
  
    getUsersById = async (id) => {

    };

    postUser = async (user) => {
      const User = await this.model.postUser(user)
      return User
    };
  }
  
  export default UsersServices;