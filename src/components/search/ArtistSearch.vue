<template>
  <!-- Conteneur des résultats de recherche des artistes -->
  <div class="max-w-lg mx-auto py-8">
    <!-- Affiche les résultats si des artistes sont trouvés -->
    <template v-if="results.length">
      <!-- Liste des artistes -->
      <ul>
        <!-- Parcours des artistes -->
        <li v-for="(artist, index) in results" :key="index" class="mb-4">
          <!-- Composant de résultat d'artiste pour chaque artiste -->
          <ArtistResult :name="artist.name" :disambiguation="artist.disambiguation" :id="artist.id"/>
        </li>
      </ul>
    </template>
    <!-- Affiche un message si aucun artiste n'est trouvé -->
    <template v-else>
      <p class="text-lg text-gray-700">Aucun artiste trouvé.</p>
    </template>
  </div>
</template>

<script>
import ArtistResult from './ArtistResults.vue'; // Import du composant de résultat d'artiste

export default {
  name: 'ArtistSearch', // Nom du composant
  components: { ArtistResult }, // Composant de résultat d'artiste
  props: {
    // Propriété pour les résultats de recherche d'artistes
    results: {
      type: Array, // Type de données attendu (un tableau)
      default: () => [] // Valeur par défaut (un tableau vide)
    }
  }
}
</script>
