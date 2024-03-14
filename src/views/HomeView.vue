<template>
  <main class="container mx-auto py-8 px-6 text-center">
    <!-- Titre et introduction -->
    <h1 class="text-5xl font-extrabold mb-4 text-gray-900">Bienvenue sur MusicBrainz</h1>
    <p class="text-lg text-gray-700 mb-8">Explorez le monde de la musique et découvrez de nouveaux artistes.</p>

    <!-- Contenu principal -->
    <div class="min-h-screen flex flex-col items-center">

      <!-- Barre de recherche -->
      <SearchBar @search="performSearch" :resetOffset="resetOffset"/>

      <!-- Résultats de la recherche par titre -->
      <div v-if="searchBy === 'title'">
        <MusicSearch :results="searchTitleResults"/>
      </div>

      <!-- Résultats de la recherche par artiste -->
      <div v-if="searchBy === 'artist'">
        <ArtistSearch :results="searchArtistResults"/>
      </div>

      <!-- Boutons de pagination -->
      <div>
        <button @click="previousPage" :disabled="offset === 0"
                class="py-2 px-4 bg-blue-500 text-white rounded-lg mr-4"
                :class="{ 'opacity-50 cursor-not-allowed': offset === 0 }">Précédent
        </button>
        <button @click="nextPage"
                :disabled="searchBy === 'title' ? (typeof searchTitleResults !== 'undefined' && searchTitleResults.length < 10) : (typeof searchArtistResults !== 'undefined' && searchArtistResults.length < 10)"
                class="py-2 px-4 bg-blue-500 text-white rounded-lg"
                :class="{ 'opacity-50 cursor-not-allowed': searchBy === 'title' ? (typeof searchTitleResults !== 'undefined' && searchTitleResults.length < 10) : (typeof searchArtistResults !== 'undefined' && searchArtistResults.length < 10) }">
          Suivant
        </button>
      </div>
    </div>
  </main>
</template>


<script>
import SearchBar from '@/components/search/SearchBar.vue';
import MusicResults from '@/components/search/MusicResults.vue';
import MusicSearch from "@/components/search/MusicSearch.vue";
import ArtistSearch from "@/components/search/ArtistSearch.vue";

export default {
  name: 'MusicApp',
  components: {
    ArtistSearch,
    MusicSearch,
    SearchBar,
    MusicResults
  },
  data() {
    return {
      searchTitleResults: [], // Résultats de recherche par titre
      searchArtistResults: [], // Résultats de recherche par artiste
      offset: 0, // Décalage pour la pagination
      query: '', // Requête de recherche
      searchBy: 'title' // Type de recherche par défaut (titre)
    }
  },
  methods: {
    // Réinitialise le décalage pour la pagination
    resetOffset() {
      this.offset = 0;
    },
    // Effectue une recherche en fonction de la requête et du type de recherche
    async performSearch(query, searchBy) {
      this.query = query;
      this.searchBy = searchBy;

      let baseUrl = 'https://musicbrainz.org/ws/2/';

      let searchType = searchBy === 'title' ? 'recording' : 'artist';

      let url = `${baseUrl}${searchType}/?fmt=json&query=${query}&limit=10&offset=${this.offset}`;

      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'MusicBrainzJsteelandt/1.0 ()',
          }
        });

        const data = await response.json();

        this.searchTitleResults = searchBy === 'title' ? data.recordings : [];
        this.searchArtistResults = searchBy === 'artist' ? data.artists : [];
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        this.searchTitleResults = [];
      }
    },

    // Affiche la page précédente des résultats de la recherche
    async previousPage() {
      if (this.offset >= 10) {
        this.offset -= 10;
        await this.performSearch(this.query, this.searchBy);
      }
    },
    // Affiche la page suivante des résultats de la recherche
    async nextPage() {
      this.offset += 10;
      await this.performSearch(this.query, this.searchBy);
    }
  }
}
</script>
