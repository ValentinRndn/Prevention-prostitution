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
import ParticularGuide from '../views/Guide/ParticularGuide.vue';
import ProfessionalGuide from '../views/Guide/ProfessionalGuide.vue';
import BlogDetail from '../components/Blog/BlogDetail.vue';
import Login from '../views/back/Login.vue';
import StructureBack from '../views/back/Structure.vue';
import LegalNotices from '../views/LegalNotices.vue';


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
                  content: 'Découvrez Prévention Prostitution Normandie, une plateforme dédiée aux Personnes en Situation de Prostitution (PSP), témoins, collectivités, et professionnels. Accédez à des ressources, dispositifs d’aide, et conseils pour favoriser l’accès aux droits, aux soins et réduire les risques.'
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Accès aux Droits et Réduction des Risques'
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
              title: 'Prévention Prostitution Normandie | Cartographie pour personnes en situation de prostitution',
              metaTags: [
                {
                  name: 'description',
                  content: "Accédez à une cartographie dédiée aux personnes en situation de prostitution. Trouvez des structures d'aide, des dispositifs de soutien et des services adaptés à vos besoins près de chez vous."
                },
                {
                  property: 'og:title',
                  content: 'Prévention Prostitution Normandie | Cartographie pour personnes en situation de prostitution'
                }
              ]
        },
        {
            path: '/cartographie/professionel',
            name: 'Professionel',
            component: Professionel,
            title: 'Prévention Prostitution Normandie | Cartographie pour professionnels',
            metaTags: [
              {
                name: 'description',
                content: "Accédez à une cartographie dédiée aux professionnels. Trouvez des structures d'aide, des dispositifs de soutien et des services adaptés à vos besoins près de chez vous."
              },
              {
                property: 'og:title',
                content: 'Prévention Prostitution Normandie | Cartographie pour professionnels'
              }
            ]
        },
        {
            path: '/guide/particularguide',
            name: 'ParticularGuide',
            component: ParticularGuide,
            title: 'Prévention Prostitution Normandie | Documentation pour personnes en situation de prostitution',
            metaTags: [
              {
                name: 'description',
                content: "Accédez à une documentation dédiée aux personnes en situation de prostitution. Trouvez des guides d'aide et des documents adaptés adaptés à vos besoins."
              },
              {
                property: 'og:title',
                content: 'Prévention Prostitution Normandie | Documentation pour personnes en situation de prostitution'
              }
            ]
        },
        {
            path: '/guide/professionalguide',
            name: 'ProfessionalGuide',
            component: ProfessionalGuide,
            title: 'Prévention Prostitution Normandie | Documentation pour professionnels',
            metaTags: [
              {
                name: 'description',
                content: "Accédez à une documentation dédiée aux professionnels. Trouvez des guides d'aide et des documents adaptés adaptés à vos besoins."
              },
              {
                property: 'og:title',
                content: 'Prévention Prostitution Normandie | Documentation pour professionnels'
              }
            ]
        },
        {
            path: '/legalNotices',
            name: 'LegalNotices',
            component: LegalNotices,
            title: 'Prévention Prostitution Normandie | Mentions légales',
            metaTags: [
              {
                name: 'description',
                content: "Consultez les mentions légales de Prévention Prostitution Normandie. Retrouvez toutes les informations juridiques sur l’éditeur, l’hébergement et les conditions d’utilisation de notre plateforme"
              },
              {
                property: 'og:title',
                content: 'Prévention Prostitution Normandie | Mentions légales'
              }
            ]
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

// Middleware pour mettre à jour le SEO
router.afterEach((to) => {
  // Mise à jour du titre
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Mise à jour des balises meta
  const metaTags = document.querySelectorAll('[data-vue-router-controlled]');
  metaTags.forEach((tag) => tag.parentNode.removeChild(tag));

  if (to.meta.metaTags) {
    to.meta.metaTags.forEach((metaTag) => {
      const tag = document.createElement('meta');
      Object.keys(metaTag).forEach((key) => {
        tag.setAttribute(key, metaTag[key]);
      });
      tag.setAttribute('data-vue-router-controlled', '');
      document.head.appendChild(tag);
    });
  }
});

export default router;
