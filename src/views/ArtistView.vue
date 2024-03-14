<template>
  <main class="container mx-auto py-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div>
        <div v-if="!error">
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
        <div v-else>
          <p>Loading...</p>
        </div>
        </div>
        <div v-else>
          <p class="text-red-500">Une erreur est survenue. L'id que vous recherchez n'existe pas.</p>
        </div>
        <RouterLink :to="'/'" class="block mt-4 text-blue-500 hover:underline">Retour</RouterLink>
      </div>
    </div>
  </main>
</template>


<script>
export default {
  data() {
    return {
      loading: true,
      error:false,
      artist: {}
    };
  },
  mounted() {
    // récupère les informations de l'artiste à l'affichage de la page
      fetch(`https://musicbrainz.org/ws/2/artist/${this.id}?fmt=json`)
          .then((response) => {
            if (!response.ok) {
              this.loading = false;
              this.error = true;
              throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json();
          })
          .then((data) => {
            this.artist = data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            this.error = true;
          });
    },
  computed: {
    // id de l'artiste entré dans la route
    id() {
      return this.$route.params.id;
    },
  },
};
</script>
