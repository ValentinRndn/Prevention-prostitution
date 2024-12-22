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
    <form @submit.prevent="sendForm" class="flex flex-col gap-6">
      <div class="first-row flex md:gap-8 w-full gap-8 sm:flex-col">
        <input v-model="form.name" type="text" placeholder="Nom" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4" required>
        <input v-model="form.email" type="email" placeholder="Email" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4" required>
      </div>
      <div class="second-row flex md:gap-8 w-full gap-8 sm:flex-col">
        <input v-model="form.subject" type="text" placeholder="Objet" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4" required>
        <input v-model="form.phone" type="tel" placeholder="Téléphone" class="border-b border-purple-fonce text-xl w-full md:w-auto pb-4">
      </div>
      <div class="textarea w-full">
        <textarea v-model="form.message" placeholder="Votre message" class="border-b border-purple-fonce text-xl w-full" required></textarea>
      </div>
      <div class="submit flex justify-end w-full sm:justify-center">
        <button :disabled="sending" class="bg-purple-fonce text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-3 rounded-md px-6 hover:bg-purple transition-colors duration-300 group">
          {{ sending ? 'Envoi en cours...' : 'Envoyer' }}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="transition-transform duration-300 transform group-hover:translate-x-2">
            <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
          </svg>
        </button>
      </div>
    </form>
  </div>
</div>


</template>


<script>
import NavigationBar from "../components/NavigationBar.vue";
import NavigationBarMobile from "../components/NavigationBarMobile.vue";
import { sendFormEmail } from "../services/MailerService";

export default {

  components: {
      NavigationBar,
      NavigationBarMobile
    },

    data() {
  return {
    form: {
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
    },
    sending: false, // Indicateur pour désactiver le bouton d'envoi
  };
},


methods: {
  async sendForm() {
    if (!this.form.name || !this.form.email || !this.form.message || !this.form.subject || !this.form.phone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.sending = true;
    try {
      // Envoyer directement les champs nécessaires au back-end
      const formData = {
        name: this.form.name, // nom
        email: this.form.email, // email
        subject: this.form.subject, // sujet
        phone: this.form.phone, // téléphone
        message: this.form.message, // message
      };

      // Envoi des données au back-end sous forme de "formData"
      await sendFormEmail(formData); // Utilise directement l'objet structuré
      alert('Votre message a été envoyé avec succès.');
      this.resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      this.sending = false;
    }
  },

  resetForm() {
    this.form = {
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
    };
  },
}




};
</script>