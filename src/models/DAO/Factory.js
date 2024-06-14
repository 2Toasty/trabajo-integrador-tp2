import HeroesModelMemory from "./heroesMemory.model.js";
import HeroesModelMongoDB from "./heroesMongo.model.js";
import UsersModelMongoDB from "./usersMongo.model.js";

class ModelFactory{

    static get(type){
        switch (type) {
            case 'MEM':
                console.log('Persistiendo en la memoria del servidor!')
                return new HeroesModelMemory();
            case 'MONGO':
                console.log('Persistiendo en la memoria de MongoDB!')
                return {
                    heroes: new HeroesModelMongoDB(),
                    users: new UsersModelMongoDB()
                  };
            default:
                console.log('Persistiendo en ... Default!')
                return new HeroesModelMemory();
                break;
        }
    }

}

export default ModelFactory