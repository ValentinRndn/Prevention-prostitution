const express = require('express');
const { sendFormEmail } = require('../services/mailer');
const router = express.Router();

router.post('/send-form-email', async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  // Vérification si l'email est valide
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Email invalide ou manquant' });
  }

  try {
    const emailContent = `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    await sendFormEmail(
      email, // L'email de l'expéditeur
      subject,
      emailContent
    );
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
  }
});



module.exports = router;
