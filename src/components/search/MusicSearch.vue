<template>
  <!-- Conteneur des résultats de recherche -->
  <div class="max-w-lg mx-auto py-8">
    <!-- Affiche les résultats si des enregistrements sont trouvés -->
    <template v-if="results.length">
      <!-- Liste des résultats -->
      <ul class="list-none">
        <!-- Parcours des enregistrements -->
        <li v-for="(recording, index) in results" :key="index" class="mb-4">
          <!-- Composant de résultats de musique pour chaque enregistrement -->
          <MusicResults :title="recording.title" :artists="recording['artist-credit']" :id="recording.id"/>
        </li>
      </ul>
    </template>
    <!-- Affiche un message si aucun enregistrement n'est trouvé -->
    <template v-else>
      <p class="text-lg text-gray-700">Aucun enregistrement trouvé.</p>
    </template>
  </div>
</template>

<script>
import MusicResults from "@/components/search/MusicResults.vue";

export default {
  components: { MusicResults }, // Composant de résultats de musique
  props: {
    // Propriété pour les résultats de recherche de musique
    results: {
      type: Array, // Type de données attendu (un tableau)
      default: () => [] // Valeur par défaut (un tableau vide)
    }
  }
}
</script>
