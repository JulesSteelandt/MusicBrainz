<template>
  <main class="container mx-auto py-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div>
        <!-- Affichage des informations de l'artiste s'il n'y a pas d'erreur -->
        <div v-if="!error">
          <!-- Vérification si le chargement est en cours -->
          <div v-if="!loading">
            <div class="mb-4">
              <h2 class="text-2xl font-bold">{{ artist.name }}</h2>
            </div>
            <div class="flex items-center mb-4">
              <h2 class="mr-2">{{ artist.gender }}</h2>
              <h2 class="text-gray-500" v-show="!artist.gender">Genre non renseigné</h2>
            </div>
            <div class="flex items-center mb-4">
              <h2 class="mr-2">{{ artist.country }}</h2>
              <h2 class="text-gray-500" v-show="!artist.country">Pays non renseigné</h2>
            </div>
            <div class="flex items-center mb-4">
              <h2 class="mr-2">{{ artist.type }}</h2>
              <h2 class="text-gray-500" v-show="!artist.type">Type d'artiste non renseigné</h2>
            </div>
            <div class="flex items-center">
              <h2 class="mr-2">{{ artist.disambiguation }}</h2>
              <h2 class="text-gray-500" v-show="!artist.disambiguation">Type de musique non renseigné</h2>
            </div>
          </div>
          <!-- Affiche "Loading..." pendant le chargement -->
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
        <!-- Affiche un message d'erreur si une erreur s'est produite -->
        <div v-else>
          <p class="text-red-500">Une erreur est survenue. L'ID que vous recherchez n'existe pas.</p>
        </div>
        <!-- Lien pour retourner à la page d'accueil -->
        <RouterLink :to="'/'" class="block mt-4 text-blue-500 hover:underline">Retour</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // Indique si les données sont en cours de chargement
      error: false, // Indique s'il y a eu une erreur lors de la récupération des données
      artist: {} // Contient les informations de l'artiste
    };
  },
  mounted() {
    // Récupère les informations de l'artiste lorsque le composant est monté
    fetch(`https://musicbrainz.org/ws/2/artist/${this.id}?fmt=json`)
        .then((response) => {
          // Vérifie si la réponse est OK
          if (!response.ok) {
            // Si la réponse n'est pas OK, affiche une erreur
            this.loading = false;
            this.error = true;
            throw new Error('Network response was not ok, status: ' + response.status);
          }
          return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
          // Met à jour les informations de l'artiste avec les données reçues
          this.artist = data;
          this.loading = false;
        })
        .catch((error) => {
          // Capture et affiche les erreurs survenues lors de la récupération des données
          console.log(error);
          this.loading = false;
          this.error = true;
        });
  },
  computed: {
    // Obtient l'ID de l'artiste à partir des paramètres de la route
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
