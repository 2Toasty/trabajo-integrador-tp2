import RandomDataGenerator from './generator.js';
import { expect } from 'chai';
import supertest from 'supertest';

const path = supertest("http://127.0.0.1:8080");
const generator = new RandomDataGenerator();

describe('Test con Faker para Usuarios', () => {
  it('Obtener datos de usuarios con Faker', () => {
    const user = generator.generateRandomUser();
    expect(user).to.be.an('object');
    expect(user).to.have.property('nombre');
    expect(user).to.have.property('mail');
  });

  it('GET /usuarios', async () => {
    const response = await path.get("/api/users/get");
    expect(response.status).to.equal(200);
  });

  it('POST /usuarios', async () => {
    const user = generator.generateRandomUser();
    const response = await path.post("/api/users/add").send(user);
    expect(response.status).to.equal(201);
    const newUser = response.body;
    expect(newUser).to.include.keys("nombre", "mail");
  });
});
