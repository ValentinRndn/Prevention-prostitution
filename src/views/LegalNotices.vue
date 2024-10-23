<template>
    <div class="container mx-auto p-10">
      <h1 class="text-3xl text-black font-bold mb-6">Mentions Légales</h1>
      <p>Bienvenue sur notre site. Voici nos informations légales :</p>
      <ul class="mt-4">
        <li><strong>Responsable du site :</strong> [Nom du responsable]</li>
        <li><strong>Adresse :</strong> [Adresse de l’entreprise]</li>
        <li><strong>Contact :</strong> [Email de contact]</li>
        <li><strong>Politique de confidentialité :</strong> Veuillez consulter notre <router-link to="/privacy-policy">politique de confidentialité</router-link>.</li>
      </ul>
      <!-- Ajoutez d’autres informations pertinentes ici -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'MentionsLegales',
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici des styles personnalisés si nécessaire */
  </style>
  