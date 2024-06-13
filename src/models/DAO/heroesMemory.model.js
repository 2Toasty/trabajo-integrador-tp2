class HeroesModelMemory {
    constructor() {
        this.Heroes = [
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

    getHeroes = async () => {
      return this.Heroes;
    };
  }
  
  export default HeroesModelMemory;