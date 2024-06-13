class ProductsModelMemory {
    constructor() {
        this.products = [
            {
              id: 1,
              nombre: "Monitor",
            },
            {
              id: 2,
              nombre: "Teclado",
            },
            {
              id: 3,
              nombre: "Mouse",
            },
          ];
    }

    getProducts = async () => {
      return this.products;
    };
  }
  
  export default ProductsModelMemory;