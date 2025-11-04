# Configuration PM2 pour PAPSP

## Vue d'ensemble

Le backend Express est maintenant géré par PM2 avec une configuration optimisée dans `ecosystem.config.cjs`.

## Configuration

Le fichier `ecosystem.config.cjs` définit :
- **Nom de l'application** : `papsp-backend`
- **Script** : `./backend/server.js`
- **Mode** : Fork (1 instance)
- **Auto-restart** : Activé
- **Limite mémoire** : 500MB (redémarre si dépassé)
- **Logs** : Stockés dans `~/logs/pm2/`
- **Gestion des erreurs** : 10 redémarrages max avec délai de 4s

## Commandes disponibles

### Via npm (recommandé)

```bash
npm run pm2:start      # Démarrer l'application
npm run pm2:stop       # Arrêter l'application
npm run pm2:restart    # Redémarrer l'application
npm run pm2:logs       # Voir les logs en temps réel
npm run pm2:status     # Voir l'état des processus
npm run pm2:monit      # Monitoring en temps réel
```

### Via PM2 directement

```bash
pm2 start ecosystem.config.cjs     # Démarrer
pm2 stop papsp-backend             # Arrêter
pm2 restart papsp-backend          # Redémarrer
pm2 reload papsp-backend           # Reload sans downtime
pm2 delete papsp-backend           # Supprimer
pm2 logs papsp-backend             # Logs en temps réel
pm2 logs papsp-backend --lines 100 # 100 dernières lignes
pm2 monit                          # Dashboard de monitoring
pm2 list                           # Liste des processus
pm2 info papsp-backend             # Infos détaillées
pm2 save                           # Sauvegarder la config
```

## Démarrage automatique au boot

Pour configurer PM2 pour démarrer au boot du serveur :

```bash
pm2 startup
# Exécuter la commande affichée (nécessite sudo)
pm2 save
```

## Logs

Les logs sont stockés dans :
- **Sortie standard** : `~/logs/pm2/papsp-backend-out.log`
- **Erreurs** : `~/logs/pm2/papsp-backend-error.log`

Pour voir les logs :
```bash
# Temps réel
pm2 logs papsp-backend

# Dernières lignes
pm2 logs papsp-backend --lines 50 --nostream

# Effacer les logs
pm2 flush
```

## Variables d'environnement

Les variables sont chargées depuis `backend/.env` grâce à la modification de `server.js` qui utilise :
```javascript
dotenv.config({ path: path.join(__dirname, '.env') });
```

## Monitoring

### Temps réel
```bash
pm2 monit
```

### Metrics
```bash
pm2 info papsp-backend
```

## Troubleshooting

### L'application ne démarre pas
1. Vérifier les logs : `pm2 logs papsp-backend --lines 50`
2. Vérifier que le fichier `.env` existe dans `backend/.env`
3. Vérifier les permissions sur les dossiers

### L'application redémarre en boucle
1. Vérifier les logs d'erreurs : `pm2 logs papsp-backend --err --lines 50`
2. Vérifier la connexion MongoDB
3. Augmenter `max_restarts` dans `ecosystem.config.cjs` si nécessaire

### Mémoire saturée
1. Vérifier l'utilisation : `pm2 monit`
2. Ajuster `max_memory_restart` dans `ecosystem.config.cjs`

## Mise à jour de l'application

```bash
# 1. Arrêter l'application
pm2 stop papsp-backend

# 2. Faire les modifications nécessaires (git pull, npm install, etc.)
git pull
cd backend && npm install

# 3. Redémarrer
pm2 restart papsp-backend

# Ou en une seule commande (reload sans downtime)
pm2 reload papsp-backend
```

## Optimisations appliquées

1. **Gestion centralisée** : Un seul fichier de config `ecosystem.config.cjs`
2. **Logs structurés** : Logs horodatés et séparés (out/error)
3. **Auto-restart intelligent** : Redémarre en cas de crash avec délai
4. **Limite mémoire** : Évite la saturation mémoire
5. **Scripts npm** : Commandes simplifiées
6. **Chargement .env corrigé** : Variables d'environnement correctement chargées
