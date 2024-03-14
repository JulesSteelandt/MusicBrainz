<template>
  <main class="container mx-auto py-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div>
        <!-- Affiche un message d'erreur si une erreur s'est produite -->
        <div v-if="!error">
          <div v-if="!loading">
            <!-- Titre de la chanson -->
            <div class="mb-4">
              <h2 class="text-2xl font-bold">{{ title.title }}</h2>
            </div>
            <!-- Durée de la chanson -->
            <div class="mb-4">
              <h2>{{ songDuration }}</h2>
            </div>
            <!-- Disambiguation de la chanson -->
            <div class="mb-4">
              <h2>{{ title.disambiguation }}</h2>
              <h2 v-show="!title.disambiguation" class="text-gray-500">Type de musique non renseigné</h2>
            </div>
            <!-- Liste des artistes associés à la chanson -->
            <div class="mb-4">
              <ul>
                <li v-for="(artist, index) in this.artist" :key="index"
                    class="hover:bg-gray-100 hover:shadow-md transition duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                  <!-- Lien vers la page de l'artiste -->
                  <RouterLink :to="'/artist/'+artist.artist.id">
                    <!-- Composant pour afficher les informations de l'artiste -->
                    <ArtistResult :name="artist.name" :disambiguation="artist.artist.disambiguation"
                                  :id="artist.artist.id"/>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <!-- Type d'artiste -->
            <div class="mb-4">
              <h2>{{ artist.type }}</h2>
              <h2 v-show="!artist.type" class="text-gray-500">Type d'artiste non renseigné</h2>
            </div>
            <!-- Date de première sortie de la chanson -->
            <div class="mb-4">
              <h2>{{ title['first-release-date'] }}</h2>
            </div>
          </div>
          <!-- Affiche "Loading..." pendant le chargement -->
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
        <!-- Affiche un message d'erreur si une erreur s'est produite -->
        <div v-else>
          <p class="text-red-500">Une erreur est survenue. L'id que vous recherchez n'existe pas.</p>
        </div>
        <!-- Lien pour retourner à la page d'accueil -->
        <RouterLink to="/" class="block mt-4 text-blue-500 hover:underline">Retour</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import ArtistResult from "@/components/search/ArtistResults.vue";

export default {
  components: { ArtistResult },
  data() {
    return {
      title: {}, // Informations sur la chanson
      artist: {}, // Informations sur l'artiste
      error: false, // Indique s'il y a eu une erreur lors de la récupération des données
      loading: true // Indique si les données sont en cours de chargement
    };
  },
  mounted() {
    // Récupère les informations de la chanson à l'affichage de la page
    fetch(`https://musicbrainz.org/ws/2/recording/${this.id}?fmt=json&inc=artist-credits`)
        .then((response) => {
          // Vérifie si la réponse est OK
          if (!response.ok) {
            this.loading = false;
            this.error = true;
            throw new Error('Network response was not ok, status: ' + response.status);
          }
          return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
          // Met à jour les informations de la chanson et de l'artiste avec les données reçues
          this.title = data;
          this.artist = data['artist-credit'];
          this.loading = false;
        })
        .catch((error) => {
          // Capture et affiche les erreurs survenues lors de la récupération des données
          console.error(error);
          this.loading = false;
          this.error = true;
        });
  },
  computed: {
    // Obtient l'ID de la chanson à partir des paramètres de la route
    id() {
      return this.$route.params.id;
    },
    // Calcule la durée de la chanson en minutes et secondes
    songDuration() {
      const duration = Math.floor(this.title.length / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration - minutes * 60;
      return `${minutes}m${seconds}s`;
    },
  },
};
</script>
