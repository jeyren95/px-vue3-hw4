<template>
  <main>
    <div class="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h1 class="text-5xl font-extrabold text-gray-900 sm:text-center">Movies</h1>
      </div>

      <div v-if="movies.length > 0" class="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
        <!-- refs will be automatically unwrapped inside the DOM -->
        <Movie 
        v-for="(movie, index) in movies"
        :key="index"
        :posterUrl="movie.posterUrl"
        :title="movie.title"
        :overview="movie.overview"
        :id="movie._id"
        :releaseDate="movie.releaseDate"
        />
      </div>

      <h1 v-else>Loading...</h1>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue"

import { fetchMovies } from "@/modules/movies/movies.service.js"

import Movie from "@/modules/movies/components/Movie.vue"

export default {
  name: 'Home',
  components: {
    Movie
  },
  setup() {
    const movies = ref([])

    const renderMovies = () => 
      fetchMovies()
      .then((data) => movies.value = data)
      .catch((err) => console.log(err))

    onMounted(renderMovies)

    return {
      movies
    }
  }
}
</script>
