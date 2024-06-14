import MongoConnection from "../MongoConnection.js"

class UsersModelMongoDB {
    constructor() {

    }

    getUsers = async () => {
      const Users = await MongoConnection.db.collection("users").find({}).toArray()
      return Users;
    };
  
    getUsersById = async (id) => {
      const Users = await MongoConnection.db.collection("users").find({id : id}).toArray()
      return Users;
    };

    postUser = async (user) => {
      const newUser = await MongoConnection.db.collection("users").insertOne(user)
      return newUser
    };
  }
  
  export default UsersModelMongoDB;