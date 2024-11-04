/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#f5c77e',
        'grey': '#3E3E3E',
        'login-input': '#BDBDBD',
        'login-text': '#616161',
        'purple-fonce': '#f1b04c',
        'login-grey': "#424242",
        'back-grey': '#E4E4E4',
        'light-grey': '#999999',
        'lightpurple' : '#CFC3FF',
        'light-beige': '#F4F0EC',
        'program-grey': '#4D5053',
        'contact-grey': '#333333',
        'post-grey': '#292F36',
        'yellow': '#FFF000',
      },
      fontFamily: {
        'cgothic': ['c-gothic', 'sans-serif'],
        'helvetica': ['Helvetica', 'sans-serif'],
        'dm-serif': ['DMSerifDisplay', 'serif'],
        'jost': ['jost', 'serif'],
        'jost-sans': ['Jost', 'sans-serif'],
        'poppins': ['Poppins-Regular', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        'phone': 'url("../assets/phone-back.png")',
        'alveoles': 'url("../assets/back-alveoles.jpg")',
        'alveoles-rotated': 'url("../assets/back-alveoles-rotated.jpg")',
        'landing': 'url("../assets/landing.jpg")',
        'banner-propos': 'url("../assets/banner-propos.svg")',
        'banner-blog': 'url("../assets/banner-blog.svg")',
        'banner-contact': 'url("../assets/banner-contact.svg")',
        'back-carto': 'url("../assets/background-carto.svg")',
        'banner-contact-mobile': 'url("../assets/contact/contact-responsive.svg")',
        'banner-propos-mobile': 'url("../assets/banner-propos-mobile.svg")',
      },    
      fontSize: {
        'login-txt': '0.60rem',
      },
      screens: {
        'sm': {'max': '639px'}, // jusqu'à 640px
        'md': {'max': '767px'}, // jusqu'à 768px
        'lg': {'max': '1023px'}, // jusqu'à 1024px
        'xl': {'max': '1279px'}, // jusqu'à 1280px
        '2xl': {'max': '1535px'}, // jusqu'à 1536px
      },
    },
  },
  plugins: [],
}


