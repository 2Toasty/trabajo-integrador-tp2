import RandomDataGenerator from './generator.js';
import { expect } from 'chai';
import supertest from 'supertest';

const path = supertest("http://127.0.0.1:8080");
const generator = new RandomDataGenerator();

describe('Test con Faker para Héroes', () => {

  let heroId;

  afterEach(async () => {
    if(heroId) {
      await path.delete(`/api/heroes/delete/${heroId}`)
      heroId = null;
    }
  })

  it('Obtener datos de héroes con Faker', () => {
    const hero = generator.generateRandomHero();
    expect(hero).to.be.an('object');
    expect(hero).to.have.property('nombre');
  });

  it('GET /heroes', async () => {
    const response = await path.get("/api/heroes/get");
    expect(response.status).to.equal(200);
  });

  it('POST /heroes', async () => {
    const hero = generator.generateRandomHero();
    const response = await path.post("/api/heroes/add").send(hero);
    expect(response.status).to.equal(201);
    const newHero = response.body;
    expect(newHero).to.be.an('object');
    expect(newHero).to.have.property('message');
    expect(newHero).to.have.property('nombre');
    expect(newHero).to.have.property('id');
    heroId = newHero.id; 
  });
});
