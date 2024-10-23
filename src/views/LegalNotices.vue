<template>
    <div class="container mx-auto p-10">
      <h1 class="text-3xl text-black font-bold mb-6">Mentions Légales</h1>
      <p>Bienvenue sur notre site. Voici nos informations légales :</p>
      
      <h2 class="text-2xl font-semibold mt-6">1. Informations sur l'éditeur du site</h2>
      <ul class="mt-4">
        <li><strong>Nom ou raison sociale :</strong> [Nom de l'entreprise ou de la personne]</li>
        <li><strong>Forme juridique :</strong> [SARL, SAS, etc.]</li>
        <li><strong>Adresse du siège social :</strong> [Adresse de l’entreprise]</li>
        <li><strong>Numéro de téléphone :</strong> [Numéro de téléphone]</li>
        <li><strong>Email de contact :</strong> [Email de contact]</li>
        <li><strong>Numéro SIRET :</strong> [Numéro SIRET]</li>
        <li><strong>Numéro de TVA intracommunautaire :</strong> [Numéro TVA]</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6">2. Hébergement</h2>
      <ul class="mt-4">
        <li><strong>Nom de l’hébergeur :</strong> [Nom de l’hébergeur]</li>
        <li><strong>Adresse de l’hébergeur :</strong> [Adresse de l’hébergeur]</li>
        <li><strong>Numéro de téléphone :</strong> [Numéro de l’hébergeur]</li>
        <li><strong>Pays de localisation des serveurs :</strong> [Pays]</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6">3. Responsabilité éditoriale</h2>
      <ul class="mt-4">
        <li><strong>Directeur de la publication :</strong> [Nom du directeur de la publication]</li>
        <li><strong>Responsable de la rédaction :</strong> [Nom du responsable de la rédaction]</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-6">4. Propriété intellectuelle</h2>
      <p class="mt-4">
        Tout le contenu présent sur ce site (textes, images, vidéos, logos, etc.) est protégé par des droits de propriété intellectuelle.
        Il est interdit de reproduire, distribuer, ou modifier ces contenus sans l’autorisation écrite préalable de l’éditeur du site.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">5. Politique de confidentialité et protection des données</h2>
      <p class="mt-4">
        Conformément à la réglementation en vigueur, les utilisateurs du site disposent de droits d’accès, de rectification, de suppression et d’opposition de leurs données personnelles. 
        Pour plus d’informations, consultez notre <router-link to="/privacy-policy">politique de confidentialité</router-link>.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">6. Cookies</h2>
      <p class="mt-4">
        Ce site utilise des cookies pour améliorer l’expérience de navigation. Vous pouvez gérer vos préférences de cookies via notre <router-link to="/cookie-policy">politique de cookies</router-link>.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">7. Liens hypertextes</h2>
      <p class="mt-4">
        Le site peut contenir des liens vers d’autres sites web. L’éditeur ne saurait être tenu responsable du contenu ou des politiques de confidentialité de ces sites tiers.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">8. Conditions générales d'utilisation</h2>
      <p class="mt-4">
        En utilisant ce site, l’utilisateur accepte les présentes conditions générales d’utilisation. Il s’engage à respecter les lois en vigueur et à ne pas publier de contenu illégal ou préjudiciable.
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">9. Droit applicable et juridiction compétente</h2>
      <p class="mt-4">
        Les présentes mentions légales sont régies par le droit [Pays]. En cas de litige, la juridiction compétente sera [tribunal compétent].
      </p>
      
      <h2 class="text-2xl font-semibold mt-6">10. Coordonnées de contact</h2>
      <p class="mt-4">
        Pour toute question concernant ces mentions légales ou pour exercer vos droits relatifs à la protection des données, veuillez nous contacter à l’adresse suivante : [Email de contact].
      </p>
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
  