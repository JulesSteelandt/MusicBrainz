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

<template>
  <div class="music-results max-w-lg mx-auto py-8">
    <template v-if="results.length">
      <ul>
        <li v-for="(recording, index) in results" :key="index" class="mb-4">
          <MusicResults :title="recording.title" :artists="recording['artist-credit']"/>
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="text-lg text-gray-700">Aucun enregistrement trouvé.</p>
    </template>
  </div>
</template>
