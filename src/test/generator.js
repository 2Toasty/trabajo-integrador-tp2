import { faker } from '@faker-js/faker';

class RandomDataGenerator {
  constructor() {}

  generateRandomUser() {
    return {
      nombre: faker.person.fullName(),
      mail: faker.internet.email(),
    };
  }

  generateRandomHero() {
    return {
      nombre: faker.person.lastName(),
    };
  }
}

export default RandomDataGenerator;
