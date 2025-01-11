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
        },
        {
            path: '/map',
            name: 'Map',
            component: Map,
        },
        {
            path: '/guide',
            name: 'Guide',
            component: Guide,
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog,
        },
        {
            path: '/blog/article/:id',
            name: 'BlogDetail',
            component: BlogDetail,
        },
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
        },
        {
            path: '/cartographie/professionel',
            name: 'Professionel',
            component: Professionel,
        },
        {
            path: '/guide/particularguide',
            name: 'ParticularGuide',
            component: ParticularGuide,
        },
        {
            path: '/guide/professionalguide',
            name: 'ProfessionalGuide',
            component: ProfessionalGuide,
        },
        {
            path: '/legalNotices',
            name: 'LegalNotices',
            component: LegalNotices,
        }
    ];

        const router = createRouter({
            history: createWebHistory(),
            routes,
            scrollBehavior(to, from, savedPosition) {
              if (savedPosition) {
                return savedPosition;
              } else {
                return { left: 0, top: 0 };
              }
            }
          });


          // Middleware global pour vérifier l'authentification avant d'accéder aux routes protégées
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('token');
    
      if (!token) {
        next({ name: 'auth' }); // Rediriger vers la page de connexion si pas de token
      } else {
        next(); // Continuer si l'utilisateur est authentifié
      }
    } else {
      next(); // Continuer si la route n'est pas protégée
    }
  });

export default router;
