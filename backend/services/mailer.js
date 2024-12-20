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
const sendConfirmationEmail = async (email, pseudo, token) => {
  const url = `http://localhost:5000/api/auth/confirm/${token}`;

  const mailOptions = {
    from: process.env.MAIL_USER, // L'email expéditeur
    to: email,  // L'email destinataire
    subject: 'Confirmez votre email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #333;">Bienvenue sur notre site 🎉</h2>
        <p style="font-size: 16px; color: #555;">
          Bonjour <strong>${pseudo}</strong>,<br><br>
          Merci de vous être inscrit sur notre plateforme ! Pour finaliser la création de votre compte, nous avons besoin que vous confirmiez votre email.
        </p>
        <p style="font-size: 16px; color: #555;">
          Cliquez sur le lien ci-dessous pour confirmer votre compte. Ce lien est valable pendant <strong>${process.env.JWT_EXPIRATION}</strong> :
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
            Confirmer mon compte
          </a>
        </div>
        <p style="font-size: 14px; color: #999; text-align: center;">
          Si vous ne pouvez pas cliquer sur le bouton ci-dessus, copiez et collez ce lien dans votre navigateur :<br>
          <a href="${url}" style="color: #0066cc;">${url}</a>
        </p>
        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
          Ce lien expirera dans <strong>${process.env.JWT_EXPIRATION}</strong>.
        </p>
        <footer style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
          Merci de votre confiance,<br>L'équipe de prévention prostitution
        </footer>
      </div>
    `,
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


// Fonction pour envoyer un email lié au formulaire
const sendFormEmail = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.MAIL_USER,  // Utilisation de l'email de l'expéditeur défini dans les variables d'environnement
    to: process.env.MAIL_USER,    // L'email destinataire (celui qui reçoit le formulaire)
    subject: subject,             // Sujet de l'email
    html: message,                // Le contenu HTML du message
    replyTo: email,               // Permet de répondre à l'email de l'utilisateur
  };

  try {
    console.log('Tentative d\'envoi de l\'email du formulaire...');
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé à', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email du formulaire:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email du formulaire');
  }
};


module.exports = { sendConfirmationEmail, sendFormEmail };