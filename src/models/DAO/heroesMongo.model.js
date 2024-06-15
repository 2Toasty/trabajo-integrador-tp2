import MongoConnection from "../MongoConnection.js"

class HeroesModelMongoDB {
    constructor() {
    }
  
    getHeroes = async () => {
      const Heroes = await MongoConnection.db.collection("heroes").find({}).toArray()
      if(Heroes.length < 1){
        throw new Error('Lista vacia. no hay nada para mostrar');
      }
    
      return Heroes;
    };
  
    getHeroesById = async (id) => {
      const simbolosComunes = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
        '[', ']', '{', '}', '\\', '|', ';', ':', '\'', '"', ',', '.', '/', '<', '>', '?', '`', '~'
    ];
      if(id < 1){
        throw new Error('ERROR, ingreso como id un numero negativo.');
      }
      for (let char of id) {
        if (simbolosComunes.includes(char)) {
            throw new Error('ERROR, el ID contiene caracteres no permitidos.');
        }
    }
      const Heroes = await MongoConnection.db.collection("heroes").find({id : id}).toArray()
      return Heroes[0];
    };

    postHeroe = async (prod) => {
      const newHeroe = await MongoConnection.db.collection("heroes").insertOne(prod)
      return newHeroe
    };

//   deleteHero = async (_id) => {
//     const Heroes = await MongoConnection.db.collection("heroes").find({_id : _id}).toArray()

//   if (Heroes === -1) {
//     throw new Error("Error : el heroe con ese ID es inexistente.");
//   } else {
//     const eliminado = await MongoConnection.db.collection("heroes").deleteOne({ _id: objectId });
//     return eliminado
//   }
// };

  }
  
  export default HeroesModelMongoDB;