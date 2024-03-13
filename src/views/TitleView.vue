<script>
export default {
  data() {
    return {
      title: {},
      artist: {},
      loading: true
    };
  },
  mounted() {
    // récupère les informations de la chanson à l'affichage de la page
    fetch(`https://musicbrainz.org/ws/2/recording/${this.id}?fmt=json&inc=artist-credits`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.title = data;
          this.artist = data['artist-credit'][0].artist;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
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
  <main>
    <div>
      <div v-if="!loading">
        <div>
          <h2>{{ title.title }}</h2>
        </div>
        <div>
          <h2>{{ songDuration }}</h2>
        </div>
        <div>
          <h2>{{ title.disambiguation }}</h2>
          <h2 v-show="!title.disambiguation">Type de musique non renseigné</h2>
        </div>
        <div>
          <RouterLink :to="`/artist/${artist.id}`">{{ artist.name }}</RouterLink>
        </div>
        <div>
          <h2>{{ artist.type }}</h2>
          <h2 v-show="!artist.type">Type d'artiste non renseigné</h2>
        </div>
        <div>
          <h2>{{ title['first-release-date'] }}</h2>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <RouterLink to="/">Retour</RouterLink>
    </div>
  </main>
</template>
