class HeroesModelMemory {
    constructor() {
        this.Heroes = [
            {
              id: 1,
              nombre: "Iron Man",
            },
            {
              id: 2,
              nombre: "Batman",
            },
            {
              id: 3,
              nombre: "Thor",
            },
          ];
    }

    getHeroes = async () => {
      return this.Heroes;
    };
  }
  
  export default HeroesModelMemory;