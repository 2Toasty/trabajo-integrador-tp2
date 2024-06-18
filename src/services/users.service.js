import ModelFactory from "../models/DAO/Factory.js";
import config from "../../config.js";

class UsersServices {
    constructor() {
      this.model = ModelFactory.get(config.PERSISTENCE).users;
    }
  
    getUsers = async () => {
      const Users = await this.model.getUsers();
      return Users;
    };
  
    getUsersById = async (id) => {      
      const Users = await this.model.getUsersById(id);
      return Users;
    };

    postUser = async (user) => {
      const User = await this.model.postUser(user)
      return User;
    };

    changeUserMailById = async(id, newMail) =>{
      const user = await this.model.changeUserMailById(id,newMail)
      return user;
    };

    deleteUser = async (id) => {
      const deleteUser = await this.model.deleteUser(id)
      return deleteUser
    }
  }
  
  export default UsersServices;