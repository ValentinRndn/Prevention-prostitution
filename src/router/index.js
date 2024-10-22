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
        },
        {
            path: '/backoffice/blog',
            name: 'BackBlog',
            component: BackBlog,
        },
        {
            path: '/backoffice/landing',
            name: 'Landing',
            component: Landing,
        },
        {
            path: '/backoffice/users',
            name: 'Users',
            component: Users,
        },
        {
            path: '/backoffice/documentation',
            name: 'DocumentationBack',
            component: DocumentationBack,
        },
        {
            path: '/backoffice/structure',
            name: 'StructureBack',
            component: StructureBack,
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

export default router;
