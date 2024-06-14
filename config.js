const PORT = 8080;
const PERSISTENCE = 'MONGO';
// revisar esta dirección
const DBSTR = 'mongodb+srv://admin:admin@clusterhero.cj1whxa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHero'

const BASE = 'integradortp2'

const TRANSPORTER_INFO = {
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

const LOGIN_MAIL_OPTIONS = {
from: 'info@demomailtrap.com',
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