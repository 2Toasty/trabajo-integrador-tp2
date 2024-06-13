import MongoConnection from "../MongoConnection.js"

class ProductsModelMongoDB {
    constructor() {

    }

    getProducts = async () => {
      const products = await MongoConnection.db.collection("heroes").find({}).toArray()
      return products;
    };
  
    getProductsById = async (id) => {

    };

    postProduct = async (prod) => {
      const newProduct = await MongoConnection.db.collection("heroes").insertOne(prod)
      return newProduct
    };
  }
  
  export default ProductsModelMongoDB;