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
    const Heroes = await MongoConnection.db
      .collection("heroes")
      .find({ id: id })
      .toArray();
    return Heroes[0];
  };

  postHeroe = async (prod) => {
    console.log("lengh string ", prod.length);
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

  deleteHeroe = async (_id) => {
    let objectId;
    objectId = new ObjectId(_id);
    const hero = await MongoConnection.db
      .collection("heroes")
      .findOne({ _id: objectId });
    if (!hero) {
      throw new Error("Error: el héroe con ese ID no existe.");
    } else {
      const result = await MongoConnection.db
        .collection("heroes")
        .deleteOne({ _id: objectId });
      return result;
    }
  };
}

export default HeroesModelMongoDB;
