<template>
        <div class="header-banner bg-banner-contact w-full h-[350px] bg-cover relative sm:hidden">
      <div class="absolute bottom-0 left-0 right-0 text-center">
        <div class="bg-white inline-block text-purple-fonce text-5xl py-6 px-24 rounded-t-2xl font-bold font-cgothic sm:px-8 sm:text-4xl">CONTACT</div>
      </div>
      </div>

    <div class="header-banner bg-banner-contact-mobile w-full h-[350px] bg-cover relative hidden sm:block">
      <div class="absolute bottom-0 left-0 right-0 text-center">
        <div class="bg-white inline-block text-purple-fonce text-5xl py-6 px-24 rounded-t-2xl font-bold font-cgothic sm:px-8 sm:text-4xl">CONTACT</div>
      </div>
      </div>

<!-- Formulaire de contact -->
<div class="contact-container flex flex-wrap justify-center items-center gap-10 mt-20 font-jost sm:mt-10 mb-8">
    <div class="info-contact font-jost-sans flex flex-col bg-purple-fonce p-10 rounded-xl text-white gap-4">
        <div class="mail-container flex items-center gap-2">
            <img src="../assets/mail_icon.png" alt="mail-icon" class="size-10">
            <a href="mailto:maraudeinnormandie@gmail.fr" class="mail font-semibold">maraudeinnormandie@gmail.fr</a>
        </div>
        <div class="phone-container flex items-center gap-2">
            <img src="../assets/phone_icon.png" alt="phone-icon" class="size-10">
            <a href="tel:0626592637" class="phone font-semibold">06.26.59.26.37</a>
        </div>
    </div>
    
    <div class="contact-form bg-white flex flex-col justify-center items-center gap-6 mt-6 font-jost-sans">
        <form class="flex flex-col gap-6">
            <div class="first-row flex md:gap-8 w-full gap-8 sm:flex-col">
                <input type="text" placeholder="Nom" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4">
                <input type="email" placeholder="Email" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4">
            </div>
            <div class="second-row flex md:gap-8 w-full gap-8 sm:flex-col">
                <input type="text" placeholder="Objet" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4">
                <input type="tel" placeholder="Téléphone" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4">
            </div>
            <div class="textarea w-full">
                <textarea placeholder="Votre message" class="border-b border-purple-fonce text-xl w-full"></textarea>
            </div>
            <div class="submit flex justify-end w-full sm:justify-center">
  <button class="bg-purple-fonce text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-3 rounded-md px-6 hover:bg-purple transition-colors duration-300 group">
    Envoyer
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="transition-transform duration-300 transform group-hover:translate-x-2">
      <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
    </svg>
  </button>
</div>

        </form>   
    </div>
</div>



<!-- Réseaux sociaux
<div class="bg-alveoles h-[700px] z-0 bg-cover relative sm:w-full sm:h-full shadow-xl pb-10">
    <div class="mx-28 sm:mx-4"> 
        <div class="text-socials relative mt-24">
            <h1 class="socials-medias text-center text-5xl font-bold text-contact-grey font-raleway sm:text-2xl sm:uppercase sm:text-purple-fonce sm:mb-2">Réseaux sociaux</h1>
            <p class="text-center text-light-grey font-raleway sm:text-grey">Vous pouvez également nous contacter sur chacun de nos réseaux sociaux. Nous vous répondrons dans les plus brefs délais..</p>
        </div>
        <div class="socials relative flex justify-center items-center mt-10 z-20 w-full gap-6  sm:mt-5">
            <div class="social-wrapper flex justify-center w-full gap-6 sm:flex-wrap"> 
                <a href="https://www.facebook.com" target="_blank" class="social bg-purple-fonce w-1/4 flex justify-center items-center py-5 rounded-md transition-transform duration-300 hover:scale-105 sm:w-[150px]">
                    <img src="../assets/contact/socials/facebook.png" alt="facebook" class="w-[50px] h-[50px]">
                </a>
                <a href="https://www.instagram.com" target="_blank" class="social bg-purple-fonce w-1/4 flex justify-center items-center py-5 rounded-md transition-transform duration-300 hover:scale-105 sm:w-[150px]">
                    <img src="../assets/contact/socials/insta.png" alt="instagram" class="w-[50px] h-[50px]">
                </a>
                <a href="https://www.linkedin.com" target="_blank" class="social bg-purple-fonce  w-1/4 flex justify-center items-center py-5 rounded-md transition-transform duration-300 hover:scale-105 sm:w-[150px]">
                    <img src="../assets/contact/socials/linkedinn.png" alt="linkedin" class="w-[50px] h-[50px]">
                </a>
                <a href="https://www.tiktok.com" target="_blank" class="social bg-purple-fonce  w-1/4 flex justify-center items-center py-5 rounded-md transition-transform duration-300 hover:scale-105 sm:w-[150px]">
                    <img src="../assets/contact/socials/tiktokk.png" alt="tiktok" class="w-[50px] h-[50px]">
                </a>
            </div>
        </div>
    </div>  




    <div class="map-container relative mx-auto z-20 h-[300px] w-1/2 mt-20 rounded-3xl overflow-hidden sm:w-[80vw] sm:mt-10 "> 
        <div id="map" class="h-full"></div>
    </div>
</div> -->



</template>


<script>

import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import NavigationBar from "../components/NavigationBar.vue";
import NavigationBarMobile from "../components/NavigationBarMobile.vue";


export default {

  components: {
      NavigationBar,
      NavigationBarMobile
    },

};
</script>