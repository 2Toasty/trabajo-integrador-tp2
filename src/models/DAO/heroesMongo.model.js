import MongoConnection from "../MongoConnection.js"

class HeroesModelMongoDB {
    constructor() {

    }

    getHeroes = async () => {
      const Heroes = await MongoConnection.db.collection("heroes").find({}).toArray()
      return Heroes;
    };
  
    getHeroesById = async (id) => {

    };

    postHeroe = async (prod) => {
      const newHeroe = await MongoConnection.db.collection("heroes").insertOne(prod)
      return newHeroe
    };
  }
  
  export default HeroesModelMongoDB;