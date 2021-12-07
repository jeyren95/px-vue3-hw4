<template>
  <main>
    <div class="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h1 class="text-5xl font-extrabold text-gray-900 sm:text-center">Movies</h1>
      </div>

      <div class="flex justify-center items-center mb-10">
        <Button 
        type="button"
        class="border-transparent text-white bg-pink-600 hover:bg-pink-700 mx-5"
        @click="() => page > 1 && page--"
        >
          <ArrowCircleLeftIcon class="h-5 w-5 mr-2" />
          Previous
        </Button>
          <p>Page {{ page }}</p> 
        <Button 
        type="button"
        class="border-transparent text-white bg-pink-600 hover:bg-pink-700 mx-5"
        @click="() => page++"
        >
          Next
          <ArrowCircleRightIcon class="h-5 w-5 ml-2" />
        </Button> 
      </div>      

      <h1 v-if="isLoading">Loading...</h1>
      <h1 v-else-if="isError">{{ error }}</h1>

      <div v-else class="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
        <!-- refs will be automatically unwrapped inside the DOM -->
        <Movie 
        v-for="(movie, index) in data"
        :key="index"
        :posterUrl="movie.posterUrl"
        :title="movie.title"
        :overview="movie.overview"
        :id="movie._id"
        :releaseDate="movie.releaseDate"
        />
      </div>

      
    </div>
  </main>
</template>

<script>
import { ref, reactive } from "vue"
import { useQuery } from "vue-query"

import { fetchMovies } from "@/services/movies.js"

import Movie from "@/modules/movies/components/Movie.vue"
import Button from "@/common/components/Button.vue"
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/vue/solid"

export default {
  name: 'Home',
  components: {
    Movie,
    Button,
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon
  },
  setup() {
    const page = ref(1)

    const { isLoading, isError, data, error } = useQuery(
      reactive(["movies", { page }]), 
      fetchMovies,
      {
        staleTime: 5000,
        refetchOnWindowFocus: false,
        keepPreviousData: true
      }
    )

    return {
      data,
      isLoading,
      isError,
      error,
      page
    }
  }
}
</script>
