const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Récupérer l'en-tête Authorization
  const authHeader = req.header('Authorization');

  // Si l'en-tête Authorization n'existe pas
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'No token, authorization denied',
      code: 'NO_TOKEN'
    });
  }

  // Extraire le token de l'en-tête Authorization ("Bearer <token>")
  const token = authHeader.split(' ')[1];

  // Si le token n'existe pas dans l'en-tête
  if (!token) {
    return res.status(401).json({ 
      message: 'Token not found',
      code: 'TOKEN_NOT_FOUND'
    });
  }

  try {
    // Vérifier et décoder le token JWT avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les informations de l'utilisateur décodé à la requête
    req.user = decoded.user;

    next(); // Continuer vers la route suivante
  } catch (err) {
    console.error('Token verification failed:', err.message);
    
    // Différencier les types d'erreurs
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED'
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        message: 'Invalid token',
        code: 'TOKEN_INVALID'
      });
    }

    return res.status(401).json({ 
      message: 'Token verification failed',
      code: 'TOKEN_VERIFICATION_FAILED'
    });
  }
};