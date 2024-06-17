import MongoConnection from "../MongoConnection.js";
import { ObjectId } from "mongodb";
class HeroesModelMongoDB {
  constructor() {}

  getHeroes = async () => {
    const Heroes = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    if (Heroes.length < 1) {
      throw new Error("Lista vacia. no hay nada para mostrar");
    }
    return Heroes;
  };

  getHeroesById = async (id) => {
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
        throw new Error("ERROR, el ID contiene caracteres no permitidos.");
      }
    }
    const stringId = parseInt(String(id));
    const Heroes = await MongoConnection.db.collection("heroes").find({ id: stringId }).toArray();
    
    return Heroes[0];
  };

  postHeroe = async (prod) => {
    if (!prod.nombre || prod.nombre.trim() === "") {
      throw new Error("Error: El campo nombre no puede estar vacío.");
    }
    const id = new ObjectId();
    const array = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    const heroToInsert = {
      ...prod,
      id: array.length + 1,
    };
    const newHeroe = await MongoConnection.db
      .collection("heroes")
      .insertOne(heroToInsert);
    return newHeroe; 
  };


  
  changeHeroNameById = async (id, newName) => {
    const array = await MongoConnection.db
    .collection("heroes")
    .find({})
    .toArray();
    if(id>array.length){
      throw new Error("El número de ID ingresado es mayor a la cantidad de elementos de esta lista.")
    }
    const simbolosComunes = [
      "!","@","#","$","%","^","&","*","(",")","-",
      "_","=","+","[","]","{","}","\\","|",";","~",
      ":","'",'"',",",".","/","<",">","?","`"
    ];
    for (let char of id) {
      if (simbolosComunes.includes(char)) {
        throw new Error("ERROR, el ID contiene caracteres no permitidos.");
      }
    }
    if(id<=0){
    throw new Error ("El ID no es válido.")
  }
  if(!newName){
    throw new Error ("El campo del Nombre no puede estar vacio.")
  }
    const nuevoId =  parseInt(String(id))
       const updateName = await MongoConnection.db.collection("heroes").updateOne(
         { id: nuevoId },
         { $set: {nombre: newName.nombre}  }
      );
      return updateName;
  };
  
  

  deleteHeroe = async (_id) => {
    let objectId;
    objectId = new ObjectId(_id);
    const hero = await MongoConnection.db.collection("heroes").findOne({ _id: objectId });
    if (!hero) {
      throw new Error("Error: el héroe con ese ID no existe.");
    } else {
      const result = await MongoConnection.db.collection("heroes").deleteOne({ _id: objectId });
      return result;
    }
  };
}

export default HeroesModelMongoDB;
