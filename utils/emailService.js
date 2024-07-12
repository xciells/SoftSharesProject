const nodemailer = require('nodemailer');

// Configurar o transporte do Nodemailer com MailerSend
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'MS_D4P0Pz@trial-3zxk54vqe06ljy6v.mlsender.net', // Usuário SMTP
        pass: 'Vrvu5i5TixnatNlU' // Senha SMTP
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'MS_D4P0Pz@trial-3zxk54vqe06ljy6v.mlsender.net',
        to: to,
        subject: subject,
        text: text
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar e-mail:', error);
                reject(error);
            } else {
                console.log('E-mail enviado:', info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = { sendEmail };
