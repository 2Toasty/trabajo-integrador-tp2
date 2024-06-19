import MongoConnection from "../MongoConnection.js";
import { ObjectId } from "mongodb";
class UsersModelMongoDB {
  constructor() {}
  /**
   * Obtiene la lista de usuarios registrados en la aplicación desde la base de datos MongoDB.
   *
   * @async
   * @function getUsers
   * @throws {Error} Si la lista de usuarios está vacía.
   * @returns {Promise<Array>} Una promesa que resuelve a un array de usuarios.
   */
  getUsers = async () => {
    const Users = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    if (Users.length < 1) {
      throw new Error("Lista vacia. no hay nada para mostrar");
    }
    return Users;
  };
  /**
   * Obtiene un usuario registrado en la aplicación desde la base de datos MongoDB por su ID.
   *
   * @async
   * @function getUsersById
   * @param {number|string} id - El ID del usuario que se desea obtener. Debe ser un número entero positivo.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de usuarios.
   * @throws {Error} Si el ID es un número negativo.
   * @throws {Error} Si el ID contiene caracteres no permitidos.
   * @returns {Promise<Array>} Una promesa que resuelve a un array con el usuario encontrado.
   */
  getUsersById = async (id) => {
    const array = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    if (id > array.length) {
      throw new Error(
        "El número de ID ingresado es mayor a la cantidad de elementos de esta lista."
      );
    }
    const simbolosComunes = [
      "!","@","#","$","%","^","&","*","(", ")","-","_",
      "=","+","[","]","{","}","\\","|",";","~",":","'",
      '"',",",".","/","<",">","?","`",
    ];
    if (id < 1) {
      throw new Error("ERROR, ingreso como id un numero negativo.");
    }
    for (let char of id) {
      if (simbolosComunes.includes(char)) {
        throw new Error("El ID contiene caracteres no permitidos.");
      }
    }
    const stringId = parseInt(String(id));
    const Users = await MongoConnection.db
      .collection("users")
      .find({ id: stringId })
      .toArray();
    return Users;
  };

  /**
   * Agrega un nuevo usuario a la base de datos MongoDB.
   *
   * @async
   * @function postUser
   * @param {Object} user - El objeto del usuario que se desea agregar.
   * @param {string} user.nombre - El nombre del usuario. No puede estar vacío.
   * @param {string} user.mail - El correo electrónico del usuario. No puede estar vacío y debe ser válido.
   * @throws {Error} Si el campo nombre o mail está vacío.
   * @throws {Error} Si el correo electrónico no es válido.
   * @returns {Promise<Object>} Una promesa que resuelve a un objeto que contiene el estado de la operación y los datos del usuario agregado.
   */
  postUser = async (user) => {
    if (
      !user.nombre ||
      user.nombre.trim() === "" ||
      !user.mail ||
      user.mail.trim() === ""
    ) {
      throw new Error("El campo nombre/mail no pueden estar vacíos.");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.mail)) {
      throw new Error("El email proporcionado no es válido.");
    }
    const id = new ObjectId();
    const array = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    const userToInsert = {
      ...user,
      id: array.length + 1,
    };
    const newUser = await MongoConnection.db
      .collection("users")
      .insertOne(userToInsert);
    console.log("tipo dato id", typeof userToInsert.id);
    return {
      acknowledged: newUser.acknowledged,
      nombre: userToInsert.nombre,
      mail: userToInsert.mail,
      id: userToInsert.id,
    };
  };
  /**
   * Cambia el correo electrónico de un usuario en la base de datos MongoDB por su ID.
   *
   * @async
   * @function changeUserMailById
   * @param {number|string} id - El ID del usuario cuyo correo electrónico se desea cambiar. Debe ser un número entero positivo.
   * @param {Object} newMail - El nuevo correo electrónico del usuario.
   * @param {string} newMail.mail - El nuevo correo electrónico del usuario. Debe ser válido según el patrón de email.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de usuarios.
   * @throws {Error} Si el correo electrónico proporcionado no es válido.
   * @throws {Error} Si el ID no es válido.
   * @throws {Error} Si el campo del correo electrónico está vacío.
   * @returns {Promise<Object>} Una promesa que resuelve al resultado de la operación de actualización.
   */
  changeUserMailById = async (id, newMail) => {
    const array = await MongoConnection.db
      .collection("users")
      .find({})
      .toArray();
    if (id > array.length) {
      throw new Error(
        "El número de ID ingresado es mayor a la cantidad de elementos de esta lista."
      );
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newMail.mail)) {
      throw new Error("El email proporcionado no es válido.");
    }
    if (id <= 0) {
      throw new Error("El ID no es válido.");
    }
    if (!newMail) {
      throw new Error("El campo del Mail no puede estar vacio.");
    }
    const nuevoId = parseInt(String(id));
    const updateMail = await MongoConnection.db
      .collection("users")
      .updateOne({ id: nuevoId }, { $set: { mail: newMail.mail } });
    return updateMail;
  };

  /**
   * Elimina un usuario de la base de datos MongoDB por su ID.
   *
   * @async
   * @function deleteUser
   * @param {number|string} id - El ID del usuario que se desea eliminar. Debe ser un número entero positivo.
   * @throws {Error} Si el ID es mayor que la cantidad de elementos en la lista de usuarios.
   * @throws {Error} Si no se encuentra un usuario con el ID especificado.
   * @returns {Promise<Object>} Una promesa que resuelve al resultado de la operación de eliminación.
   */

  deleteUser = async (id) => {
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
    const user = await MongoConnection.db
      .collection("users")
      .findOne({ id: stringId });
    if (!user) {
      throw new Error("El usuario con ese id no existe.");
    } else {
      const result = await MongoConnection.db
        .collection("users")
        .deleteOne({ id: stringId });
      return result;
    }
  };
}

export default UsersModelMongoDB;
