<template>
  <div class="max-w-lg mx-auto py-8">
    <template v-if="results.length">
      <ul>
        <li v-for="(artist, index) in results" :key="index" class="mb-4">
          <ArtistResult :name="artist.name" :disambiguation="artist.disambiguation" :id="artist.id"/>
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="text-lg text-gray-700">Aucun artiste trouvé.</p>
    </template>
  </div>
</template>

<script>
import ArtistResult from './ArtistResults.vue';

export default {
  name: 'ArtistSearch',
  components: {
    ArtistResult
  },
  props: {
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
