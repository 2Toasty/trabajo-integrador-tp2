import MongoConnection from "../MongoConnection.js"
import { ObjectId } from "mongodb";
class UsersModelMongoDB {
    constructor() {

    }

    getUsers = async () => {
      
      const Users = await MongoConnection.db.collection("users").find({}).toArray()
      if(Users.length < 1){
        throw new Error ("Lista vacia. no hay nada para mostrar");
      }
      return Users;
    };

    getUsersById = async (id) => {
      const simbolosComunes = [
        "!","@","#","$","%","^","&","*","(",")","-",
        "_","=","+","[","]","{","}","\\","|",";","~",
        ":","'",'"',",",".","/","<",">","?","`"
      ];
      if (id < 1) {
        throw new Error("ERROR, ingreso como id un numero negativo.");
      }
      for (let char of id) {
        if (simbolosComunes.includes(char)) {
          throw new Error("El ID contiene caracteres no permitidos.");
        }
      }
      const stringId = parseInt(String(id));
      const Users = await MongoConnection.db.collection("users").find({ id: stringId }).toArray();
      return Users;
  };

    postUser = async (user) => {
    if (!user.nombre || user.nombre.trim() === "" || !user.mail || user.mail.trim() === "") {
      throw new Error("El campo nombre/mail no pueden estar vacíos.");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.mail)) {
        throw new Error("El email proporcionado no es válido.");
    }
    const id = new ObjectId();
    const array = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    const userToInsert = {
      ...user,
      id: array.length + 1,
    };
    const newUser = await MongoConnection.db
      .collection("users")
      .insertOne(userToInsert);
      console.log('tipo dato id',typeof userToInsert.id); // typeof newUser.id no te daba nada por que el resultado de pegarle a mongo es un acknowledged y un insertedId 
    // return newUser; // original
    return { acknowledged: newUser.acknowledged, nombre: userToInsert.nombre, mail: userToInsert.mail ,id: userToInsert.id}; // creado para que funcione el test
    }
    
    deleteUser = async (id) => {
      const stringId = parseInt(String(id));
      const user = await MongoConnection.db.collection("users").findOne({ id: stringId });
      if (!user) {
        throw new Error("El usuario con ese id no existe.");
      } else {
        const result = await MongoConnection.db.collection("users").deleteOne({ id: stringId });
        return result;
      }
    }
  }
  
  export default UsersModelMongoDB;