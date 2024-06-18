# Trabajo-Integrador-tp2

### Importante!
Antes de correr el proyecto se debe agregar el archivo de configuracion con el siguiente formato:


```js
const PORT = ****;
const PERSISTENCE = '******';
const DBSTR = '******'
const BASE = '******'

const EMAIL = '******';
const PASS = '******';

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
```