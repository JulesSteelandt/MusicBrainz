<template>
  <!-- Conteneur de la barre de recherche -->
  <div class="search-bar flex flex-col sm:flex-row items-center justify-center mt-8">
    <!-- Sélecteur de type de recherche (titre ou artiste) -->
    <select v-model="searchBy" @change="reset" class="mr-2 mb-2 sm:mb-0 sm:mr-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none">
      <option value="title">Titre</option>
      <option value="artist">Artiste</option>
    </select>
    <!-- Champ de recherche -->
    <div class="relative mb-2 sm:mb-0">
      <input type="text" v-model="query" @input="search" placeholder="Recherche..." class="py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-300">
      <!-- Bouton de réinitialisation du champ de recherche -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg @click="resetQuery" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-blue-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 15l6-6M9 15l6-6"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resetOffset: Function, // Fonction pour réinitialiser le décalage de pagination
  },
  data() {
    return {
      query: '', // Requête de recherche
      searchBy: 'title' // Type de recherche par défaut
    }
  },
  methods: {
    // Réinitialise la requête de recherche et le décalage de pagination
    resetQuery() {
      this.query = '';
      this.resetOffset();
      this.$emit('search', this.query, this.searchBy); // Émet un événement de recherche
    },
    // Réinitialise la recherche en changeant le type de recherche
    reset() {
      this.search();
    },
    // Effectue une recherche en émettant un événement de recherche
    search() {
      this.resetOffset(); // Réinitialise le décalage de pagination
      this.$emit('search', this.query, this.searchBy); // Émet un événement de recherche
    }
  }
}
</script>
