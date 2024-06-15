const PORT = 8080;
const PERSISTENCE = 'MONGO';
const DBSTR = 'mongodb+srv://admin:admin@clusterhero.cj1whxa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHero'

const BASE = 'integradortp2'
const EMAIL = 'superheroapiort@gmail.com';
const PASS = 'ettqbuympzdrjwol';

const TRANSPORTER_INFO_TEST = {
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
    user: '30bd23c4628197',
    pass: '8bf9d37f4b4d15',
    },
    tls: {
      rejectUnauthorized: false
    }
};

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