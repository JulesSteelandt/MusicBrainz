<!-- MusicResults.vue -->
<template>
  <div class="music-results">
    <ul v-if="results.length">
      <li v-for="(recording, index) in results" :key="index">
        <MusicResults :title="recording.title" :artists="recording['artist-credit']"/>
      </li>
    </ul>
    <p v-else>Aucun enregistrement trouvé.</p>
  </div>
</template>

<script>
import MusicResults from "@/components/MusicResults.vue";

export default {
  name: 'MusicSearch',
  components: {MusicResults},
  props: {
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
