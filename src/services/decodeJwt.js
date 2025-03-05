// decodeJwt.js
export const decodeJwt = (token) => {
  
    if (!token) {
      throw new Error('No token provided');
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
  
// Fonction pour récupérer le rôle d'utilisateur à partir du token JWT
export const getUserRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
      try {
          const decodedToken = decodeJwt(token);
          if (decodedToken && decodedToken.user && decodedToken.user.role) {
              return decodedToken.user.role;
          } else {
              console.warn("Le rôle n'est pas défini dans le token JWT.");
              return null;
          }
      } catch (err) {
          console.error("Erreur lors du décodage du token JWT:", err);
          return null;
      }
  } else {
      console.warn('Aucun token JWT trouvé.');
      return null;
  }
};

// Fonction pour récupérer le pseudonyme de l'utilisateur à partir du token JWT
export const getUserPseudoFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeJwt(token);
        if (decodedToken && decodedToken.user && decodedToken.user.pseudo) {
          return decodedToken.user.pseudo;
        } else {

            return null;
        }
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  };
