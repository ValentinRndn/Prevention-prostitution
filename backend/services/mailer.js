const nodemailer = require('nodemailer');

// Configuration du transporteur pour Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail comme service d'envoi
  auth: {
    user: process.env.MAIL_USER,  // Votre email Gmail
    pass: process.env.MAIL_PASS,  // Votre mot de passe Gmail ou mot de passe d'application
  },
});

// Fonction pour envoyer un email de confirmation
const sendConfirmationEmail = async (email, token) => {
  const url = `http://localhost:5000/api/auth/confirm/${token}`;

  const mailOptions = {
    from: process.env.MAIL_USER, // L'email expéditeur
    to: email,  // L'email destinataire
    subject: 'Confirmez votre email',
    text: `Veuillez confirmer votre email en cliquant sur le lien suivant : ${url}`,
    html: `<p>Veuillez confirmer votre email en cliquant sur le lien suivant : <a href="${url}">${url}</a></p>`,
  };

  try {
    console.log('Tentative d\'envoi de l\'email...');
    await transporter.sendMail(mailOptions);
    console.log('Email de confirmation envoyé à', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
};

module.exports = sendConfirmationEmail;
