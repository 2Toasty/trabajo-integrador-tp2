const PORT = 8080;
const PERSISTENCE = 'MONGO';
const DBSTR = 'mongodb+srv://admin:admin@clusterhero.cj1whxa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHero'
const BASE = 'integradortp2'

const EMAIL = 'superheroapiort@gmail.com';
const PASS = 'ettqbuympzdrjwol';

const TRANSPORTER_INFO = {
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
};

const LOGIN_MAIL_OPTIONS = {
from: EMAIL,
to: 'xx',
subject: 'Bienvenido a la SuperHeroe API!',
text: 'Te has logueado correctamente'
};

export default{
    PORT,
    PERSISTENCE,
    DBSTR,
    BASE,
    TRANSPORTER_INFO,
    LOGIN_MAIL_OPTIONS
}