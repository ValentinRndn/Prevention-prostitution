const express = require('express');
const { sendFormEmail } = require('../services/mailer');
const router = express.Router();

router.post('/send-form-email', async (req, res) => {
  const { name, email, subject, phone, message } = req.body;
  console.log('Requête reçue pour le formulaire de contact :', req.body);

  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">Nouveau Message du Site Prévention Prostitution</h2>
        <p style="font-size: 16px; color: #555;">
          Vous avez reçu un nouveau message via le formulaire de contact du site Prévention Prostitution.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <div style="font-size: 16px; color: #333;">
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
          <p><strong>Téléphone :</strong> ${phone ? phone : 'Non renseigné'}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <div style="font-size: 16px; color: #333;">
          <p><strong>Message :</strong></p>
          <blockquote style="margin: 20px 0; padding: 10px; background-color: #f2f2f2; border-left: 4px solid #4CAF50;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer style="font-size: 14px; color: #777; text-align: center;">
          <p>Ce message a été envoyé par le formulaire de contact du site Prévention Prostitution.</p>
        </footer>
      </div>
    `;

    await sendFormEmail(
      email, // L'email de l'expéditeur
      subject, // Sujet de l'email
      emailContent // Contenu HTML de l'email
    );

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
  }
});

module.exports = router;
