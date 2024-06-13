import ProductsServices from "../services/products.service.js";

class ProductsController {
    constructor() {
      this.services = new ProductsServices();
    }

    getProducts = async (req, res) => {
      const products = await this.services.getProducts();
      res.send(products);
    };
  
    getProductsById = async (req, res) => {

    };

    postProduct = async (req, res) => {
      const newProduct = req.body
      const prod = await this.services.postProduct(newProduct)
      //Solo el controlador maneja la respuesta del servidor
      res.send(prod)
    };
}
  
  export default ProductsController;