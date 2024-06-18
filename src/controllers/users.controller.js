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
        console.log(`voy a enviar el mail a ${result.nombre} con mail ${result.mail}`);
        MailSender.sendMail(req.body.mail);
      }
       res.status(201).send({
        acknowledged: result.acknowledged,
        nombre: result.nombre,
        mail: result.mail,
        id: result.id
    
      }) 
    } catch (error) {
      console.log("Ocurrio un " + error);
      res.send({
        statuscode: 401,
        message: "Formato invalido, vuelva a intentarlo.",
      });
    }
  };

  changeUserMailById = async (req,res) => {
    try{
      const { id } = req.params;
      const newMail = req.body;
      const nuevoNombre = await this.services.changeUserMailById(id,newMail);
      res.send(newMail)
    } catch(error){
      console.log("error :" + error);
      res.send({
        statuscode: 401,
        message:
          "El Id ingresado no es válido o el Mail ingresado no tiene formato válido",
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userDeleted = await this.services.deleteUser(id);
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
