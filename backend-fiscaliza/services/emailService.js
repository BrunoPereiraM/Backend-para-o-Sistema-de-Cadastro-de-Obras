const nodemailer = require('nodemailer');
require('dotenv').config();

// Crie uma conta de teste no Ethereal: https://ethereal.email/
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Usuário gerado pelo Ethereal
    pass: process.env.EMAIL_PASS, // Senha gerada pelo Ethereal
  },
});

exports.sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: '"Sistema de Fiscalização de Obras" <noreply@fiscaliza.com>',
    to: to,
    subject: subject,
    html: html,
  });

  console.log('Message sent: %s', info.messageId);
  // URL para visualizar o e-mail enviado (apenas com Ethereal)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};