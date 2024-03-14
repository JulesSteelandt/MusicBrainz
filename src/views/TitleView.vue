<script>
import ArtistResult from "@/components/search/ArtistResults.vue";

export default {
  components: {ArtistResult},
  data() {
    return {
      title: {},
      artist: {},
      error: false,
      loading: true
    };
  },
  mounted() {
    // récupère les informations de la chanson à l'affichage de la page
    fetch(`https://musicbrainz.org/ws/2/recording/${this.id}?fmt=json&inc=artist-credits`)
        .then((response) => {
          if (!response.ok) {
            this.loading = false;
            this.error = true;
            throw new Error('Network response was not ok, status: ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          this.title = data;
          this.artist = data['artist-credit'];
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.error = true;
        });
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    songDuration() {
      const duration = Math.floor(this.title.length / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration - minutes * 60;
      return `${minutes}m${seconds}s`;
    },
  },
};
</script>
<template>
  <main class="container mx-auto py-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div>
        <div v-if="!error">
          <div v-if="!loading">
            <div class="mb-4">
              <h2 class="text-2xl font-bold">{{ title.title }}</h2>
            </div>
            <div class="mb-4">
              <h2>{{ songDuration }}</h2>
            </div>
            <div class="mb-4">
              <h2>{{ title.disambiguation }}</h2>
              <h2 v-show="!title.disambiguation" class="text-gray-500">Type de musique non renseigné</h2>
            </div>
            <div class="mb-4">
              <ul>
                <li v-for="(artist, index) in this.artist" :key="index"
                    class="hover:bg-gray-100 hover:shadow-md transition duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                  <RouterLink :to="'/artist/'+artist.artist.id">
                    <ArtistResult :name="artist.name" :disambiguation="artist.artist.disambiguation"
                                  :id="artist.artist.id"/>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div class="mb-4">
              <h2>{{ artist.type }}</h2>
              <h2 v-show="!artist.type" class="text-gray-500">Type d'artiste non renseigné</h2>
            </div>
            <div class="mb-4">
              <h2>{{ title['first-release-date'] }}</h2>
            </div>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
        <div v-else>
          <p class="text-red-500">Une erreur est survenue. L'id que vous recherchez n'existe pas.</p>
        </div>
        <RouterLink to="/" class="block mt-4 text-blue-500 hover:underline">Retour</RouterLink>
      </div>
    </div>
  </main>
</template>
