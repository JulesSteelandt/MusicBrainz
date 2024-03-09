<script>
import SearchBar from '../components/SearchBar.vue';
import MusicResults from '../components/MusicResults.vue';
import MusicSearch from "@/components/MusicSearch.vue";

export default {
  name: 'MusicApp',
  components: {
    MusicSearch,
    SearchBar,
    MusicResults
  },
  data() {
    return {
      searchResults: [],
      offset: 0,
      query: ''
    }
  },
  methods: {
    resetOffset() {
      this.offset = 0;
    },
    async performSearch(query) {
      this.query = query; // Store the current query
      try {
        const response = await fetch(`https://musicbrainz.org/ws/2/recording/?query=${query}&fmt=json&limit=10&offset=${this.offset}`,
            {
              headers: {
                'User-Agent': 'MusicBrainzJsteelandt/1.0 ()',
              }
            });
        const data = await response.json();
        this.searchResults = data.recordings;
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        this.searchResults = [];
      }
    },
    async previousPage() {
      if (this.offset >= 10) {
        this.offset -= 10;
        await this.performSearch(this.query);
      }
    },
    async nextPage() {
      this.offset += 10;
      await this.performSearch(this.query);
    }
  }
}
</script>

<template>
  <div class="music-app">
    <SearchBar @search="performSearch" :resetOffset="resetOffset" />
    <MusicSearch :results="searchResults" />
    <div class="pagination">
      <button @click="previousPage" :disabled="offset === 0">Précédent</button>
      <button @click="nextPage" :disabled="searchResults.length < 10">Suivant</button>
    </div>
  </div>
</template>
