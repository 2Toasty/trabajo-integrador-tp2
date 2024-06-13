import ProductsModelMemory from "./productsMemory.model.js";
import ProductsModelMongoDB from "./productsMongo.model.js";

class ModelFactory{

    static get(type){
        switch (type) {
            case 'MEM':
                console.log('Persistiendo en la memoria del servidor!')
                return new ProductsModelMemory();
            case 'MONGO':
                console.log('Persistiendo en la memoria de MongoDB!')
                return new ProductsModelMongoDB();
            default:
                console.log('Persistiendo en ... Default!')
                return new ProductsModelMemory();
                break;
        }
    }

}

export default ModelFactory