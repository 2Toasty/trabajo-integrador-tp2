import MongoConnection from "../MongoConnection.js";
import { Long, ObjectId } from "mongodb";
class HeroesModelMongoDB {
  constructor() {}

  /**
   * Obtiene la lista de héroes desde la base de datos MongoDB.
   *
   * @async
   * @function getHeroes
   * @throws {Error} Si la lista de héroes está vacía.
   * @returns {Promise<Array>} Una promesa que resuelve a un array de héroes.
   */
  getHeroes = async () => {
    const Heroes = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    if (Heroes.length < 1) {
      throw new Error("Lista vacia. no hay nada para mostrar");
    }
    return Heroes;
  };

  /**
   * Obtiene un héroe de la base de datos MongoDB por su ID.
   *
   * @async
   * @function getHeroesById
   * @param {number|string} id - El ID del héroe que se desea obtener. Debe ser un número entero positivo.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de héroes.
   * @throws {Error} Si el ID es un número negativo.
   * @throws {Error} Si el ID contiene caracteres no permitidos.
   * @returns {Promise<Object|null>} Una promesa que resuelve al héroe con el ID especificado, o `null` si no se encuentra.
   */
  getHeroesById = async (id) => {
    const array = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    if (id > array.length) {
      throw new Error(
        "El número de ID ingresado es mayor a la cantidad de elementos de esta lista."
      );
    }
    const simbolosComunes = [
      "!","@","#","$","%","^","&","*","(",")","-",
      "_","=","+","[","]","{","}","\\","|",";","~",
      ":","'",'"',",",".","/","<",">","?","`"
     ];
    if (id < 1) {
      throw new Error("ERROR, ingreso como id un numero negativo.");
    }
    for (let char of id) {
      if (simbolosComunes.includes(char)) {
        throw new Error("ERROR, el ID contiene caracteres no permitidos.");
      }
    }
    const stringId = parseInt(String(id));
    const Heroes = await MongoConnection.db
      .collection("heroes")
      .find({ id: stringId })
      .toArray();

    return Heroes[0];
  };
  /**
   * Agrega un nuevo héroe a la base de datos MongoDB.
   *
   * @async
   * @function postHeroe
   * @param {Object} prod - El objeto del héroe que se desea agregar.
   * @param {string} prod.nombre - El nombre del héroe. No puede estar vacío.
   * @throws {Error} Si el campo nombre está vacío.
   * @returns {Promise<Object>} Una promesa que resuelve al objeto del héroe que se ha agregado.
   */
  postHeroe = async (prod) => {
    if (!prod.nombre || prod.nombre.trim() === "") {
      throw new Error("Error: El campo nombre no puede estar vacío.");
    }
    const id = new ObjectId();
    const array = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    const heroToInsert = {
      ...prod,
      id: array.length + 1,
    };
    const newHeroe = await MongoConnection.db
      .collection("heroes")
      .insertOne(heroToInsert);
    return heroToInsert;
  };
  /**
   * Cambia el nombre de un héroe en la base de datos MongoDB por su ID.
   *
   * @async
   * @function changeHeroNameById
   * @param {number|string} id - El ID del héroe cuyo nombre se desea cambiar. Debe ser un número entero positivo.
   * @param {Object} newName - El nuevo nombre del héroe.
   * @param {string} newName.nombre - El nuevo nombre del héroe. No puede estar vacío.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de héroes.
   * @throws {Error} Si el ID contiene caracteres no permitidos.
   * @throws {Error} Si el ID es un número no válido.
   * @throws {Error} Si el campo del nombre está vacío.
   * @returns {Promise<Object>} Una promesa que resuelve al resultado de la operación de actualización.
   */
  changeHeroNameById = async (id, newName) => {
    const array = await MongoConnection.db
      .collection("heroes")
      .find({})
      .toArray();
    if (id > array.length) {
      throw new Error(
        "El número de ID ingresado es mayor a la cantidad de elementos de esta lista."
      );
    }
     const simbolosComunes = [
       "!","@","#","$","%","^","&","*","(",")","-",
       "_","=","+","[","]","{","}","\\","|",";","~",
       ":","'",'"',",",".","/","<",">","?","`"
      ];
    for (let char of id) {
      if (simbolosComunes.includes(char)) {
        throw new Error("ERROR, el ID contiene caracteres no permitidos.");
      }
    }
    if (id <= 0) {
      throw new Error("El ID no es válido.");
    }
    if (!newName) {
      throw new Error("El campo del Nombre no puede estar vacio.");
    }
    const nuevoId = parseInt(String(id));
    const updateName = await MongoConnection.db
      .collection("heroes")
      .updateOne({ id: nuevoId }, { $set: { nombre: newName.nombre } });
    return updateName;
  };

  /**
   * Elimina un héroe de la base de datos MongoDB por su ID.
   *
   * @async
   * @function deleteHeroe
   * @param {number|string} id - El ID del héroe que se desea eliminar. Debe ser un número entero positivo.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de héroes.
   * @throws {Error} Si el héroe con el ID especificado no existe.
   * @returns {Promise<Object>} Una promesa que resuelve al resultado de la operación de eliminación.
   */
  deleteHeroe = async (id) => {
    const array = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    if (id > array.length) {
      throw new Error(
        "El número de ID ingresado es mayor a la cantidad de elementos de esta lista."
      );
    }
    const stringId = parseInt(String(id));
    const hero = await MongoConnection.db
      .collection("heroes")
      .findOne({ id: stringId });
    if (!hero) {
      throw new Error("Error: el héroe con ese ID no existe.");
    } else {
      const result = await MongoConnection.db
        .collection("heroes")
        .deleteOne({ id: stringId });
      return result;
    }
  };
}

export default HeroesModelMongoDB;
