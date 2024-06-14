import nodemailer from 'nodemailer';
import config from '../../config.js'


class MailSender {

    static sendMail = async (userEmail) => {

        const mailOptions = config.LOGIN_MAIL_OPTIONS;        
        mailOptions.to = userEmail;

        const transporter = nodemailer.createTransport(config.TRANSPORTER_INFO);

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('Error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
    }

}

export default MailSender