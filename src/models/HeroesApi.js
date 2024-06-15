import axios from 'axios';

class HeroesApi {

    getRamdomHeroe = async () => {
        try {            
            const max = 562;
            
            const ramdomElement = Math.floor(Math.random() * max) + 1;

            const response = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`);
            
            const data = response.data[ramdomElement];

            const heroe = {
              id: data.id,
              name: data.name,
              power: data.powerstats.intelligence + data.powerstats.strength + data.powerstats.speed
               + data.powerstats.power + data.powerstats.durability + data.powerstats.combat
            };

            return heroe;
        } catch (error) {
            console.error('El error es: ', error);
        }
    };
    
}
export default HeroesApi