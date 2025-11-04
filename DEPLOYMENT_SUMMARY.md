# Résumé de la Configuration PAPSP - Production

**Date de mise en place** : 3 Novembre 2025
**Statut** : ✅ Opérationnel

---

## Architecture

### Frontend (Vue.js)
- **Emplacement** : `/var/www/PAPSP-FRONT/dist`
- **Serveur web** : Nginx
- **URL** : https://preventionprostitutionnormandie.com
- **Build** : `npm run build` (génère le dossier `/dist`)

### Backend (Express + Node.js)
- **Emplacement** : `/var/www/PAPSP-FRONT/backend`
- **Gestionnaire de processus** : PM2
- **Port** : 5000 (local uniquement)
- **Nom du processus PM2** : `papsp-backend`
- **Base de données** : MongoDB (Atlas)

### Configuration PM2
- **Fichier de config** : [ecosystem.config.cjs](file:///var/www/PAPSP-FRONT/ecosystem.config.cjs)
- **Logs** : `~/logs/pm2/`
  - Sortie : `papsp-backend-out.log`
  - Erreurs : `papsp-backend-error.log`
- **Auto-restart** : Activé (max 10 tentatives, délai 4s)
- **Limite mémoire** : 500MB

### Configuration Nginx
- **Fichier de config** : `/etc/nginx/sites-available/vuejs`
- **Proxy API** : `/api/*` → `http://127.0.0.1:5000`
- **Fichiers statiques** : `/uploads/*` → `/var/www/PAPSP-FRONT/backend/uploads/`
- **SSL/TLS** : Let's Encrypt (Certbot)
- **Redirections** :
  - HTTP → HTTPS
  - .fr → .com

---

## Commandes Utiles

### Gestion PM2

```bash
# Via npm (recommandé)
npm run pm2:status      # Voir l'état
npm run pm2:logs        # Voir les logs en temps réel
npm run pm2:restart     # Redémarrer l'application
npm run pm2:stop        # Arrêter l'application
npm run pm2:start       # Démarrer l'application
npm run pm2:monit       # Monitoring en temps réel

# Via PM2 directement
pm2 list                # Liste des processus
pm2 logs papsp-backend  # Logs en temps réel
pm2 restart papsp-backend
pm2 monit              # Dashboard
```

### Déploiement Frontend

```bash
cd /var/www/PAPSP-FRONT

# 1. Récupérer les dernières modifications
git pull

# 2. Installer les dépendances (si nécessaire)
npm install

# 3. Builder le frontend
npm run build

# 4. Nginx sert automatiquement les nouveaux fichiers
# Pas besoin de redémarrer Nginx
```

### Déploiement Backend

```bash
cd /var/www/PAPSP-FRONT

# 1. Récupérer les dernières modifications
git pull

# 2. Installer les dépendances backend (si nécessaire)
cd backend && npm install && cd ..

# 3. Redémarrer PM2
npm run pm2:restart

# 4. Vérifier les logs
npm run pm2:logs
```

### Déploiement Complet (Frontend + Backend)

```bash
cd /var/www/PAPSP-FRONT
git pull
npm install
npm run build
cd backend && npm install && cd ..
npm run pm2:restart
```

### Gestion Nginx

```bash
# Tester la configuration
sudo nginx -t

# Recharger Nginx (sans interruption)
sudo systemctl reload nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir les logs d'erreur
sudo tail -f /var/log/nginx/error.log

# Voir les logs d'accès
sudo tail -f /var/log/nginx/access.log
```

---

## Monitoring

### Vérifier que tout fonctionne

```bash
# Site web
curl -I https://preventionprostitutionnormandie.com
# Attendu: HTTP/1.1 200 OK

# Backend (local)
curl http://localhost:5000
# Attendu: 404 (normal, pas de route à la racine)

# PM2
pm2 list
# Le status doit être "online"
```

### Logs

```bash
# Logs PM2 (backend)
pm2 logs papsp-backend --lines 50

# Logs Nginx (erreurs)
sudo tail -50 /var/log/nginx/error.log

# Logs PM2 personnalisés
tail -50 ~/logs/pm2/papsp-backend-out.log
tail -50 ~/logs/pm2/papsp-backend-error.log
```

---

## Troubleshooting

### Le site retourne une erreur 500
1. Vérifier que le dossier `/var/www/PAPSP-FRONT/dist` existe et contient `index.html`
2. Vérifier les permissions : `ls -la /var/www/PAPSP-FRONT/dist`
3. Vérifier les logs Nginx : `sudo tail -50 /var/log/nginx/error.log`

### Les appels API ne fonctionnent pas
1. Vérifier que PM2 tourne : `pm2 list`
2. Vérifier les logs backend : `pm2 logs papsp-backend`
3. Tester le backend directement : `curl http://localhost:5000/api/...`
4. Vérifier la connexion MongoDB dans les logs

### PM2 redémarre en boucle
1. Vérifier les logs : `pm2 logs papsp-backend --err --lines 50`
2. Vérifier le fichier `.env` : `cat backend/.env`
3. Vérifier la connexion MongoDB
4. Vérifier que le port 5000 n'est pas déjà utilisé : `lsof -i :5000`

### Les fichiers uploadés ne s'affichent pas
1. Vérifier les permissions : `ls -la /var/www/PAPSP-FRONT/backend/uploads/`
2. Tester directement : `curl -I https://preventionprostitutionnormandie.com/uploads/...`
3. Vérifier la configuration Nginx

---

## Sauvegardes

### Fichiers de configuration importants

- `/var/www/PAPSP-FRONT/ecosystem.config.cjs` - Config PM2
- `/etc/nginx/sites-available/vuejs` - Config Nginx
- `/var/www/PAPSP-FRONT/backend/.env` - Variables d'environnement
- `/var/www/PAPSP-FRONT/backend/uploads/` - Fichiers uploadés

### Sauvegarde manuelle

```bash
# Sauvegarder la config Nginx
sudo cp /etc/nginx/sites-available/vuejs /etc/nginx/sites-available/vuejs.backup.$(date +%Y%m%d)

# Sauvegarder les uploads
tar -czf ~/backup-uploads-$(date +%Y%m%d).tar.gz /var/www/PAPSP-FRONT/backend/uploads/

# Sauvegarder le .env
cp /var/www/PAPSP-FRONT/backend/.env ~/backup-env-$(date +%Y%m%d)
```

---

## Optimisations Appliquées

### PM2
✅ Configuration centralisée dans `ecosystem.config.cjs`
✅ Logs horodatés et séparés (out/error)
✅ Auto-restart intelligent avec limite
✅ Gestion de la mémoire (limite 500MB)
✅ Scripts npm pour faciliter l'utilisation
✅ Chargement correct du fichier `.env`

### Nginx
✅ Cache optimisé (assets: 1 an, uploads: max)
✅ Headers de sécurité et proxy améliorés
✅ Gzip activé pour les fichiers texte
✅ Support SSL/TLS avec Let's Encrypt
✅ Redirection HTTP → HTTPS automatique
✅ Support du routing Vue.js (SPA)

### Sécurité
✅ Backend accessible uniquement en local (127.0.0.1)
✅ CORS configuré pour le domaine uniquement
✅ Variables sensibles dans `.env` (non versionné)
✅ SSL/TLS avec certificats Let's Encrypt

---

## Support

Pour toute question sur cette configuration, consulter :
- [PM2_README.md](file:///var/www/PAPSP-FRONT/PM2_README.md) - Documentation PM2 détaillée
- Logs PM2 : `npm run pm2:logs`
- Logs Nginx : `sudo tail -f /var/log/nginx/error.log`
