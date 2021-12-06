<template>
  <div class="bg-white">
    <MovieDetails />
  </div>
</template>

<script>
import MovieDetails from "@/modules/movies/components/MovieDetails.vue"

export default {
  name: "Movie",
  components: {
    MovieDetails
  }
}

</script>