<template>
    <div class="flex w-[100vw] h-[100vh]">
        <div class="w-[50vw] flex justify-center items-center">
            <div class="flex flex-col w-[400px] h-[200px] justify-center font-cgothic   ">
                <h1 class="form-control font-cgothic font-bold text-login-grey text-3xl ">Connexion </h1>
                <label for="username" class="bg-gray-200 mt-4 rounded-t-md text-login-txt pl-3 pt-2 text-login-grey">EMAIL</label>
                <input type="text" id="username" v-model="email" class="form-control bg-gray-200 rounded-b-md px-2 pb-5 outline-none focus:ring-0 text-login-grey" required>
                <label for="password" class="bg-gray-200 mt-6 rounded-t-md text-login-txt pl-3 pt-2 text-login-grey">PASSWORD</label>
                <input type="password" id="password" v-model="password" class="form-control bg-gray-200 rounded-b-md px-2 pb-5 outline-none focus:ring-0 text-login-grey " required>
                <button type="submit" @click="login" class="bg-purple-fonce text-white px-4 py-2 w-full  rounded-md mt-6 text-md font-bold ">CONTINUER</button>
                <div v-if="error" class="">
                    {{ error }} 
                </div>
            </div>
            
        </div>
        <img src="../../assets/alveoles2.png" alt="alveoles" class="h-[100vh] w-[60vw] object-cover" />
    </div>
</template>

<script>
 import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '', 
            error: null
        };
    },

    methods: {
        login() {
    axios.post('http://localhost:5000/api/auth/login', {
        email: this.email,
        password: this.password
    })
    .then(response => {
        console.log('Response:', response);

        // Vérifiez si la réponse contient un token
        if (response.status === 200 && response.data.token) {
            // Enregistrez le token dans le localStorage
            localStorage.setItem('token', response.data.token); 
            // Redirigez vers la page de l'administrateur
            this.$router.push('/backoffice/dashboard');
        } else {
            // Afficher un message d'erreur si l'authentification a échoué
            console.log(response.data);
            this.error = "email ou mot de passe incorrect";
        }
    })
    .catch(error => {
        // Afficher un message d'erreur si une erreur se produit lors de la requête
        console.error('Erreur lors de la requête d\'authentification:', error);
        this.error = "Une erreur s'est produite lors de l'authentification";
    });
}
    }
};
</script>
