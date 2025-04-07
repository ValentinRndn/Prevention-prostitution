export function loadGoogleMapsAPI(apiKey) {
    return new Promise((resolve, reject) => {
      // Vérifie si l'API est déjà chargée
      if (typeof google !== 'undefined') {
        resolve(); // L'API est déjà disponible
        return;
      }
  
      // Crée une balise <script> pour charger Google Maps
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
  
      // Appelle resolve() une fois que le script est chargé
      script.onload = resolve;
  
      // Appelle reject() si une erreur se produit lors du chargement
      script.onerror = () => reject(new Error('Failed to load Google Maps API'));
  
      // Ajoute la balise <script> au <head> de la page
      document.head.appendChild(script);
    });
  }