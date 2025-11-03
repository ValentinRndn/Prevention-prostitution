import { createRouter, createWebHistory } from 'vue-router';
import LandingFront from '../views/Landing.vue';
import Map from '../views/Map.vue';
import Guide from '../views/Guide.vue';
import Contact from '../views/Contact.vue';
import Dashboard from '../views/back/Dashboard.vue';
import Users from '../views/back/Users.vue';
import DocumentationBack from '../views/back/Documentation.vue';
import Landing from '../views/back/Landing.vue';
import BackBlog from '../views/back/Blog.vue';
import Blog from '../views/Blog.vue';
import Particulier from '../views/cartographie/Particulier.vue';
import Professionel from '../views/cartographie/Professionel.vue';
import ContentGuide from '../views/Guide/ContentGuide.vue';
import BlogDetail from '../components/Blog/BlogDetail.vue';
import Login from '../views/back/Login.vue';
import StructureBack from '../views/back/Structure.vue';
import LegalNotices from '../views/LegalNotices.vue';
import NotFound from '../views/NotFound.vue';
import { useHead } from '@vueuse/head';


    const routes = [
        {
            path: '/',
            name: 'LandingFront',
            component: LandingFront,
            meta: {
              title: 'Prévention Prostitution Normandie | Accès aux Droits et Réduction des Risques',
              metaTags: [
                {
                  name: 'description',
                  content: "Prévention Prostitution Normandie : ressources et aides pour les PSP, témoins et professionnels afin de favoriser l'accès aux droits et réduire les risques."
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Accès aux Droits et Réduction des Risques'
                },
                {
                  name: 'keywords',
                  content: 'prostitution, prévention, normandie, accès aux droits, réduction des risques, aide, accompagnement, témoins, professionnels, PSP'
                }
              ]
            }
        },
        {
            path: '/map',
            name: 'Map',
            component: Map,
            meta: {
              title: 'Prévention Prostitution Normandie | Cartographie',
              metaTags: [
                {
                  name: 'description',
                  content: 'Découvrez les structures adaptées à votre situation. Que vous soyez en situation de prostitution ou un professionnel/témoin, accédez à des aides adaptées pour soutenir et accompagner les personnes concernées.'
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Cartographie'
                },
                {
                  name: 'keywords',
                  content: 'prostitution, prévention, normandie, accès aux droits, réduction des risques, aide, accompagnement, témoins, professionnels, PSP, cartes, structures, services'
                }
              ]
            }
        },
        {
            path: '/guide',
            name: 'Guide',
            component: Guide,
            meta: {
              title: 'Prévention Prostitution Normandie | Documentation',
              metaTags: [
                {
                  name: 'description',
                  content: 'Découvrez les documents adaptés à votre situation. Que vous soyez en situation de prostitution ou un professionnel/témoin, accédez à des aides adaptées pour soutenir et accompagner les personnes concernées.'
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Documentation'
                },
                {
                  name: 'keywords',
                  content: 'prostitution, prévention, normandie, accès aux droits, réduction des risques, aide, accompagnement, témoins, professionnels, PSP, guides, documents'
                }
              ]
            }
        },
        
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: {
              title: 'Prévention Prostitution Normandie | Contact',
              metaTags: [
                {
                  name: 'description',
                  content: "Vous avez des questions ou besoin d'informations ? Contactez Prévention Prostitution Normandie. Notre équipe est là pour vous accompagner et répondre à vos besoins."
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Contact'
                },
                {
                  name: 'keywords',
                  content: 'prostitution, prévention, normandie, accès aux droits, réduction des risques, aide, accompagnement, témoins, professionnels, PSP, contact, informations'
                }
              ]
            }
        },
        // {
        //     path: '/blog',
        //     name: 'Blog',
        //     component: Blog,
        // },
        // {
        //     path: '/blog/article/:id',
        //     name: 'BlogDetail',
        //     component: BlogDetail,
        // },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/backoffice/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/backoffice/blog',
            name: 'BackBlog',
            component: BackBlog,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/backoffice/landing',
            name: 'Landing',
            component: Landing,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/backoffice/users',
            name: 'Users',
            component: Users,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/backoffice/documentation',
            name: 'DocumentationBack',
            component: DocumentationBack,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/backoffice/structure',
            name: 'StructureBack',
            component: StructureBack,
            meta: {
                requiresAuth: true // Route protégée
              }
        },
        {
            path: '/cartographie/particulier',
            name: 'Particulier',
            component: Particulier,
            meta: {
              title: 'Cartographie Aide PSP Normandie | Personnes en Situation de Prostitution',
              canonical: 'https://preventionprostitutionnormandie.com/cartographie/particulier',
              metaTags: [
                {
                  name: 'description',
                  content: "Carte interactive des structures d'aide pour personnes en situation de prostitution en Normandie. Trouvez hébergement, soutien médical, accompagnement juridique près de chez vous."
                },
                {
                  property: 'og:title',
                  content: 'Cartographie Aide PSP Normandie'
                },
                {
                  property: 'og:description',
                  content: "Carte des structures d'aide pour personnes en situation de prostitution en Normandie."
                },
                {
                  property: 'og:url',
                  content: 'https://preventionprostitutionnormandie.com/cartographie/particulier'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image'
                },
                {
                  name: 'twitter:title',
                  content: 'Cartographie Aide PSP Normandie'
                },
                {
                  name: 'twitter:description',
                  content: "Carte des structures d'aide pour personnes en situation de prostitution."
                },
                {
                  name: 'keywords',
                  content: 'prostitution normandie, aide psp, structures accompagnement, carte services sociaux, hébergement urgence, accompagnement juridique'
                }
              ]
            }
        },
        {
            path: '/cartographie/professionnel',
            name: 'Professionnel',
            component: Professionel,
            meta: {
              title: 'Cartographie Professionnels | Accompagnement PSP Normandie',
              canonical: 'https://preventionprostitutionnormandie.com/cartographie/professionnel',
              metaTags: [
                {
                  name: 'description',
                  content: "Carte des structures pour professionnels accompagnant les personnes en situation de prostitution. Services médico-sociaux, juridiques et d'insertion en Normandie."
                },
                {
                  property: 'og:title',
                  content: 'Cartographie Professionnels PSP Normandie'
                },
                {
                  property: 'og:description',
                  content: "Structures d'accompagnement professionnel pour PSP en Normandie."
                },
                {
                  property: 'og:url',
                  content: 'https://preventionprostitutionnormandie.com/cartographie/professionnel'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image'
                },
                {
                  name: 'twitter:title',
                  content: 'Cartographie Professionnels PSP'
                },
                {
                  name: 'twitter:description',
                  content: "Services professionnels pour l'accompagnement des PSP."
                },
                {
                  name: 'keywords',
                  content: 'professionnels prostitution, accompagnement social, services médico-sociaux normandie, structures aide psp, formation professionnels'
                }
              ]
            }
        },
        {
            path: '/guide/contentGuide',
            name: 'ContentGuide',
            component: ContentGuide,
            meta: {
              title: 'Guides et Documentation PSP | Prévention Prostitution Normandie',
              canonical: 'https://preventionprostitutionnormandie.com/guide/contentGuide',
              metaTags: [
                {
                  name: 'description',
                  content: "Guides pratiques et documentation pour personnes en situation de prostitution. Accès aux droits, démarches administratives, soutien médical et social en Normandie."
                },
                {
                  property: 'og:title',
                  content: 'Guides et Documentation PSP Normandie'
                },
                {
                  property: 'og:description',
                  content: "Guides pratiques pour personnes en situation de prostitution en Normandie."
                },
                {
                  property: 'og:url',
                  content: 'https://preventionprostitutionnormandie.com/guide/contentGuide'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image'
                },
                {
                  name: 'twitter:title',
                  content: 'Guides PSP Normandie'
                },
                {
                  name: 'twitter:description',
                  content: "Documentation et guides pratiques pour PSP."
                },
                {
                  name: 'keywords',
                  content: 'guides prostitution, documentation psp, accès aux droits, démarches administratives, réduction risques, aide sociale normandie'
                }
              ]
            }
        },
        {
            path: '/legalNotices',
            name: 'LegalNotices',
            component: LegalNotices,
            meta: {
              title: 'Mentions Légales | Prévention Prostitution Normandie',
              canonical: 'https://preventionprostitutionnormandie.com/legalNotices',
              metaTags: [
                {
                  name: 'description',
                  content: "Mentions légales de Prévention Prostitution Normandie. Informations sur l'éditeur, l'hébergement et les conditions d'utilisation de la plateforme."
                },
                {
                  property: 'og:title',
                  content: 'Mentions Légales - PAPSP'
                },
                {
                  property: 'og:description',
                  content: "Mentions légales et informations juridiques."
                },
                {
                  property: 'og:url',
                  content: 'https://preventionprostitutionnormandie.com/legalNotices'
                },
                {
                  property: 'og:type',
                  content: 'website'
                },
                {
                  name: 'twitter:card',
                  content: 'summary'
                },
                {
                  name: 'twitter:title',
                  content: 'Mentions Légales - PAPSP'
                },
                {
                  name: 'robots',
                  content: 'noindex, follow'
                },
                {
                  name: 'keywords',
                  content: 'mentions légales, conditions utilisation, rgpd, données personnelles'
                }
              ]
            }
        },
        // 404 - Catch all route (must be last)
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: {
              title: 'Page non trouvée - 404 | Prévention Prostitution Normandie',
              canonical: 'https://preventionprostitutionnormandie.com/404',
              metaTags: [
                {
                  name: 'description',
                  content: "La page que vous recherchez n'existe pas. Retournez à l'accueil ou consultez nos guides et cartes pour trouver l'aide dont vous avez besoin."
                },
                {
                  name: 'robots',
                  content: 'noindex, follow'
                },
                {
                  property: 'og:title',
                  content: 'Page non trouvée - PAPSP'
                },
                {
                  property: 'og:description',
                  content: "Cette page n'existe pas."
                },
                {
                  property: 'og:type',
                  content: 'website'
                }
              ]
            }
        }
    ];


// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

// Middleware pour vérifier l’authentification
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' }); // Redirection vers la page de connexion
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  const title = to.meta.title || 'Prévention Prostitution Normandie'; 
  const metaTags = to.meta.metaTags || []; 

  useHead({
    title,
    meta: metaTags,
  });
});

export default router;
