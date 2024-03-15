<template>
  <!-- Conteneur pour afficher les détails de l'artiste -->
  <div>
    <!-- Lien vers la page de détails de l'artiste -->
    <RouterLink :to="'/artist/' + id" class="hover:text-gray-600">{{ name }}</RouterLink>
    <!-- Affiche la désambiguïsation s'il y en a -->
    <p v-if="disambiguation" class="text-sm text-gray-500">{{ disambiguation }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArtistResult', // Nom du composant
  props: {
    name: String, // Propriété pour le nom de l'artiste (de type chaîne de caractères)
    id: String, // Propriété pour l'identifiant de l'artiste (de type chaîne de caractères)
    disambiguation: String // Propriété pour la désambiguïsation de l'artiste (de type chaîne de caractères)
  }
}
</script>
