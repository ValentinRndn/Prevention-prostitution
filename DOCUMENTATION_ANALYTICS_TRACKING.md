# Documentation Analytics & Tracking - Prévention Prostitution Normandie

**Date:** Janvier 2025
**Site:** https://preventionprostitutionnormandie.com

---

## 🎯 Vue d'ensemble

Ce document récapitule tous les services, identifiants et configurations utilisés pour le tracking et l'analyse des données du site.

---

## 📊 Services & Plateformes

### 1. Google Analytics 4 (GA4)
**Fonction:** Analyse du trafic et du comportement des utilisateurs sur le site

- **ID de mesure:** `G-XHGKZLF3RK`
- **Propriété ID:** `511622248`
- **Compte:** Prevention-prostitution
- **URL Console:** https://analytics.google.com/

**Données collectées:**
- Nombre de visiteurs (utilisateurs uniques)
- Pages vues
- Temps moyen sur le site
- Sources de trafic (direct, recherche, réseaux sociaux, référents)
- Événements personnalisés
- Géolocalisation des visiteurs
- Appareils utilisés (desktop, mobile, tablette)

**API utilisée:** Google Analytics Data API v1
- Endpoint: `https://analyticsdata.googleapis.com/v1beta/properties/{propertyId}/runReport`

---

### 2. Google Tag Manager (GTM)
**Fonction:** Gestionnaire de balises qui charge GA4 et autres scripts de tracking

- **ID Conteneur:** `GTM-TG55LTR2`
- **URL Console:** https://tagmanager.google.com/

**Configuration:**
- Charge automatiquement Google Analytics (G-XHGKZLF3RK)
- S'active uniquement avec le consentement des cookies (performance)
- Désactivé sur toutes les pages `/backoffice/*`
- Activé sur toutes les pages publiques

**Script d'implémentation:**
```html
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-TG55LTR2"></script>
```

---

### 3. Google Cloud Platform - Service Account
**Fonction:** Authentification serveur pour accéder aux données GA4 depuis le backend

- **Fichier de credentials:** `backend/config/ga4-credentials.json` (non versionné dans git)
- **Type:** Service Account JSON
- **Email du service account:** Visible dans le fichier ga4-credentials.json
- **Projet GCP:** Lié au compte Google Analytics

**⚠️ SÉCURITÉ:**
- Ce fichier contient des clés privées
- NE JAMAIS commiter ce fichier dans git
- Déjà ajouté au `.gitignore`
- Conservé uniquement sur le serveur de production

**Permissions requises:**
- Lecteur Google Analytics (roles/analyticsdata.viewer)
- Accès à l'API Analytics Data

---

## 🏗️ Architecture Technique

### Backend (Node.js/Express)

**Fichier principal:** `/var/www/PAPSP-FRONT/backend/services/analyticsService.js`

**Endpoints API:**

1. **GET /api/analytics/users-overview**
   - Utilisateurs actifs, nouveaux utilisateurs, utilisateurs engagés
   - Sessions totales, taux de rebond, durée moyenne

2. **GET /api/analytics/traffic-overview**
   - Sessions et pages vues sur 7 jours
   - Graphique d'évolution temporelle

3. **GET /api/analytics/top-pages**
   - Pages les plus consultées
   - Nombre de vues par page

4. **GET /api/analytics/traffic-sources**
   - Répartition par source (direct, recherche, social, referral)
   - Pourcentages par source

5. **GET /api/analytics/devices**
   - Répartition desktop/mobile/tablet
   - Pourcentages par type d'appareil

6. **GET /api/analytics/locations**
   - Pays et villes des visiteurs
   - Nombre de visiteurs par localisation

**Dépendances npm:**
```json
{
  "@google-analytics/data": "^4.x",
  "google-auth-library": "^9.x"
}
```

---

### Frontend (Vue.js 3)

**Composant Dashboard:** `/var/www/PAPSP-FRONT/src/views/back/Dashboard.vue`

**Sections affichées:**
- 📊 Statistiques générales (utilisateurs, sessions, engagement)
- 📈 Graphique de trafic (7 derniers jours)
- 📄 Pages populaires (top 10)
- 🌍 Sources de trafic (pie chart)
- 📱 Types d'appareils (pie chart)
- 🗺️ Géolocalisation (tableau)

**Composant Cookie Banner:** `/var/www/PAPSP-FRONT/src/components/CookieBanner.vue`

**Gestion du consentement:**
- Stockage dans `localStorage.cookieConsent`
- Types de cookies:
  - `performance`: Active GA4/GTM
  - `functionality`: Active Leaflet Maps
  - `advertising`: Non utilisé (pas de pub)

**Logic de tracking:**
```javascript
// GTM ne charge que si:
1. L'utilisateur a accepté les cookies de performance
2. La page ne commence PAS par /backoffice
3. Le consentement est stocké dans localStorage
```

---

## 🔧 Configuration Serveur

### PM2 (Backend)
**Fichier config:** `/var/www/PAPSP-FRONT/backend/ecosystem.config.js`

```javascript
{
  name: "backend-prevention-prostitution",
  script: "./server.js",
  instances: 1,
  exec_mode: "fork",
  watch: false,
  env: {
    NODE_ENV: "production",
    PORT: 3000,
    GOOGLE_APPLICATION_CREDENTIALS: "./config/ga4-credentials.json"
  }
}
```

**Commandes utiles:**
```bash
# Démarrer le backend
pm2 start ecosystem.config.js

# Redémarrer après modification
pm2 restart backend-prevention-prostitution

# Voir les logs
pm2 logs backend-prevention-prostitution

# Status
pm2 status
```

---

### Nginx (Frontend)
**Config:** `/etc/nginx/sites-available/preventionprostitutionnormandie`

**Proxy API:**
```nginx
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**Root:**
```nginx
root /var/www/PAPSP-FRONT/dist;
```

---

## 📋 Pages Trackées vs Non Trackées

### ✅ Pages TRACKÉES (GA4 activé)

**Pages principales:**
- `/` - Page d'accueil
- `/carte` - Sélection cartographie
- `/guide` - Sélection documentation
- `/contact` - Page contact
- `/legalNotices` - Mentions légales

**Sous-pages cartographie:**
- `/cartographie/particulier`
- `/cartographie/professionnel`

**Sous-pages guide:**
- `/guides/particuliers`
- `/guides/professionnels`

### ❌ Pages NON TRACKÉES (GA4 désactivé)

**Backoffice (toutes les pages):**
- `/backoffice/dashboard` - Dashboard analytics (cette page justement!)
- `/backoffice/users` - Gestion utilisateurs
- `/backoffice/documentation` - Gestion docs
- `/backoffice/structures` - Gestion structures
- `/backoffice/blog` - Gestion blog
- `/backoffice/landing` - Gestion landing
- `/login` - Page de connexion

**Raison:** Éviter de fausser les statistiques avec vos propres sessions d'administration longues.

---

## 🔐 Sécurité & Confidentialité

### RGPD & Cookie Consent

**Implémentation:**
- Banner de consentement obligatoire
- Consentement granulaire (performance, fonctionnalité)
- Possibilité de refuser tous les cookies
- Option de personnalisation
- Lien vers mentions légales

**Données stockées:**
```javascript
{
  "performance": true/false,
  "functionality": true/false,
  "advertising": false
}
```

### Protection des credentials

**Fichiers sensibles ignorés par Git:**
```gitignore
backend/config/ga4-credentials.json
backend/.env
backend/.env.local
NOUVEAUX_SECRETS_SECURISES.txt
```

---

## 🛠️ Commandes de Build & Déploiement

### Build Frontend
```bash
cd /var/www/PAPSP-FRONT
npm run build
```
Génère le dossier `dist/` avec les fichiers statiques optimisés.

### Redémarrer Backend
```bash
cd /var/www/PAPSP-FRONT/backend
pm2 restart backend-prevention-prostitution
```

### Rechargement Nginx
```bash
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

---

## 📊 Métriques Clés Disponibles

### Utilisateurs
- **Active Users:** Utilisateurs sur la période sélectionnée
- **New Users:** Nouveaux visiteurs
- **Engaged Users:** Utilisateurs avec engagement (>10s ou 2+ pages)

### Engagement
- **Sessions:** Nombre de visites
- **Bounce Rate:** Taux de rebond (% visiteurs 1 page)
- **Avg Session Duration:** Temps moyen par session
- **Pages per Session:** Nombre de pages par visite

### Acquisition
- **Traffic Sources:** Direct, organic search, social, referral
- **Top Pages:** Pages les plus consultées
- **Geographic Data:** Pays et villes

### Technologie
- **Device Category:** Desktop, mobile, tablet
- **Browser & OS:** Navigateurs et systèmes d'exploitation

---

## 🐛 Débogage & Logs

### Vérifier que GTM se charge

**Console navigateur (F12):**
```javascript
// Vérifier si dataLayer existe
window.dataLayer

// Doit afficher un tableau avec les events GTM
// Si undefined ou [], GTM n'est pas chargé

// Vérifier le consentement
localStorage.getItem('cookieConsent')
// Doit afficher: {"performance":true,"functionality":true,"advertising":false}

// Logs de débogage
// Chercher dans la console:
"Google Tag Manager: Tentative d'initialisation sur /chemin"
"Google Tag Manager: Chargement du script GTM..."
"Google Tag Manager: Déjà chargé, activation du tracking"
```

### Vérifier l'API Backend

```bash
# Test endpoint utilisateurs
curl http://localhost:3000/api/analytics/users-overview

# Test endpoint trafic
curl http://localhost:3000/api/analytics/traffic-overview

# Logs PM2
pm2 logs backend-prevention-prostitution --lines 100
```

### Erreurs courantes

**Problème:** Dashboard ne charge pas les données
- ✅ Vérifier que le backend PM2 est actif: `pm2 status`
- ✅ Vérifier les credentials GA4: fichier `ga4-credentials.json` existe
- ✅ Vérifier la console navigateur pour erreurs API

**Problème:** GTM ne se charge pas
- ✅ Vérifier le consentement cookies dans localStorage
- ✅ Vérifier qu'on n'est pas sur `/backoffice/*`
- ✅ Vérifier la console pour logs "Google Tag Manager:"

**Problème:** "Sans balise" dans GA4 Tag Coverage
- ✅ Attendre 24-48h pour détection par Google
- ✅ Vérifier que la page a été visitée (pas seulement accédée)
- ✅ Vider cache navigateur et retester

---

## 📞 Contacts & Ressources

### Consoles d'administration

- **Google Analytics:** https://analytics.google.com/
- **Google Tag Manager:** https://tagmanager.google.com/
- **Google Cloud Console:** https://console.cloud.google.com/

### Documentation technique

- **GA4 Data API:** https://developers.google.com/analytics/devguides/reporting/data/v1
- **GTM Setup Guide:** https://support.google.com/tagmanager/answer/6103696
- **Vue.js 3:** https://vuejs.org/
- **Chart.js:** https://www.chartjs.org/

---

## ✅ Checklist Maintenance

### Mensuel
- [ ] Vérifier que toutes les pages sont trackées dans GA4 Tag Coverage
- [ ] Analyser les métriques et tendances
- [ ] Vérifier les logs PM2 pour erreurs

### Lors d'ajout de nouvelles pages
- [ ] Vérifier que la page n'est PAS sous `/backoffice/*`
- [ ] Tester le chargement de GTM dans la console
- [ ] Attendre 24-48h et vérifier dans GA4 Tag Coverage

### Sécurité
- [ ] Ne jamais commiter `ga4-credentials.json`
- [ ] Renouveler les credentials tous les 90 jours (bonnes pratiques)
- [ ] Vérifier les permissions du Service Account

---

## 📝 Notes Importantes

1. **Confidentialité:** Le backoffice est exclu du tracking pour ne pas fausser les statistiques avec les sessions d'administration longues (ex: 160 minutes).

2. **Performance:** GTM charge GA4 de manière asynchrone pour ne pas impacter la vitesse de chargement du site.

3. **Consentement:** Le tracking ne démarre que si l'utilisateur accepte les cookies de performance via le banner.

4. **Credentials:** Le fichier `ga4-credentials.json` est critique - en cas de perte, il faut créer un nouveau Service Account dans Google Cloud Console.

5. **API Limits:** L'API GA4 a des limites de requêtes. Le dashboard utilise un cache côté client pour éviter trop d'appels.

---

**Dernière mise à jour:** Janvier 2025
**Responsable technique:** Équipe Dev Prévention Prostitution Normandie
