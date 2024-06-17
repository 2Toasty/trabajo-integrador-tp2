import UsersServices from "../services/users.service.js";
import MailSender from "../models/MailSender.js";

class UsersController {
  constructor() {
    this.services = new UsersServices();
  }

  getUsers = async (req, res) => {
    try {
      const Users = await this.services.getUsers();
    res.send(Users);
    } catch (error) {
      
      console.log("Ocurrio un " + error);
      res.send({
        statuscode: 401,
        message: "La lista sobre la cual se intento hacer un get se encuentra vacia."+
        "Agrege al menos un usuario y vuelva a intentarlo.",
      });
    }
    
  };

  getUsersById = async (req, res) => {
    
    try {
      const { id } = req.params;
    const Users = await this.services.getUsersById(id);
    res.send(Users);
    } catch (error) {
      
      console.log("Ocurrio un " + error);
      res.send({
        statuscode: 401,
        message: "Se ingreso un formato invalido.",
      });
    }
    
  };

  postUser = async (req, res) => {
    try {
      const newUser = req.body;
      const result = await this.services.postUser(newUser);

      if (result.acknowledged == true) {
        console.log("voy a enviar el mail a ");
        MailSender.sendMail(req.body.mail);
      }
       res.status(201).send(result); 
    } catch (error) {
      console.log("Ocurrio un " + error);
      res.send({
        statuscode: 401,
        message: "Formato invalido, vuelva a intentarlo.",
      });
    }
  };
  deleteUser = async (req, res) => {
    try {
      const { _id } = req.params;
      const userDelete = await this.services.deleteUser(_id);
      res.send("Se elimino sactifactoriamente..");
    } catch (error) {
      console.log("Ocurrio un " + error);
      res.send({
        statuscode: 401,
        message: "Error: ID inexistente.",
      });
    }
  };
}

export default UsersController;
