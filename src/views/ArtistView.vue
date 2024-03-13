<template>
  <main>
    <div>
      <div v-if="!loading">
        <div>
          <h2>{{ artist.name }}</h2>
        </div>
        <div>
          <h2>{{ artist.gender }}</h2>
          <h2 v-show="!artist.gender">Genre non renseigné</h2>
        </div>
        <div>
          <h2>{{ artist.country }}</h2>
          <h2 v-show="!artist.country">Pays non renseigné</h2>
        </div>
        <div>
          <h2>{{ artist.type }}</h2>
          <h2 v-show="!artist.type">Type d'artiste non renseigné</h2>
        </div>
        <div>
          <h2>{{ artist.disambiguation }}</h2>
          <h2 v-show="!artist.disambiguation">Type de musique non renseigné</h2>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <RouterLink :to="'/'">Retour</RouterLink>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      artist: {}
    };
  },
  mounted() {
    // récupère les informations de l'artiste à l'affichage de la page
      fetch(`https://musicbrainz.org/ws/2/artist/${this.id}?fmt=json`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.artist = data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
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
