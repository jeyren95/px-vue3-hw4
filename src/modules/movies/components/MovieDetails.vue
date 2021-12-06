<template>
  <div 
  v-if="!isLoading"
  class="
  max-w-2xl 
  mx-auto
  py-16 px-4
  sm:py-24
  sm:px-6
  lg:max-w-7xl
  lg:px-8
  lg:grid
  lg:grid-cols-2
  lg:gap-x-8
  ">
    <div class="lg:max-w-lg lg:self-end">
      <div class="mt-4">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 smLtext-4xl">{{ movieDetails.title }}</h1>
      </div>
      <div class="mt-4">
        <div class="flex items-center">
          <p class="text-lg text-gray-900 sm:text-xl">{{ movieDetails.releaseDate }}</p>
        </div>
        <div class="mt-4 space-y-6">
          <p class="text-base text-gray-500">
            {{ movieDetails.overview }}
          </p>
        </div>
      </div>
      <div v-if="comments.length > 0" class="mt-4">
        <Comment 
        v-for="(comment, index) in comments"
        :key="index"
        :rating="comment.rating"
        :content="comment.content"
        :id="comment._id"
        @comment-deleted="renderComments"
        />
      </div>
    </div>

    <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
      <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
        <img :src="movieDetails.posterUrl" alt />
      </div>
    </div>

    <div class="lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
      <div v-if="accessToken !== ''" class="mt-10">
        <div class="max-w-md">
          <CommentForm 
          :id="movieId"
          @comment-submitted="renderComments"
          />
        </div>
      </div>

      <div v-else class="mt-10">
        <router-link to="/login">
          <Button
          type="button"
          class="border-transparent text-white bg-pink-600 hover:bg-pink-700 mt-5"
          >
            Login to comment!
          </Button>
        </router-link>
      </div>
    </div>
  </div>

  <div 
  v-else
  class="
  max-w-2xl 
  mx-auto
  py-16 px-4
  sm:py-24
  sm:px-6
  lg:max-w-7xl
  lg:px-8
  lg:grid
  lg:grid-cols-2
  lg:gap-x-8
  ">
    <h1>Loading...</h1>
  </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from "vue" 
import { useStore } from "vuex"
import { useRoute } from "vue-router"

import Button from "@/common/components/Button.vue"
import CommentForm from "./CommentForm.vue"
import Comment from "./Comment.vue"

import { fetchComments, fetchMovie } from "../movies.service.js" 

export default {
  components: {
    Button,
    CommentForm,
    Comment
  },
  setup() {
    const route = useRoute()
    const store = useStore()  

    const movieId = route.params.id
    const movieDetails = reactive({
      title: "",
      posterUrl: "",
      overview: "",
      releaseDate: "",
    })
    const comments = ref([]) 
    const isLoading = ref(true)   

    const renderComments = () => 
      fetchComments(movieId)
      .then((data) => comments.value = data)
      .catch((err) => console.log(err))


    const renderMovieDetails = () => 
      fetchMovie(movieId)
      .then((data) => {
        movieDetails.title = data.title
        movieDetails.posterUrl = data.posterUrl
        movieDetails.overview = data.overview
        movieDetails.releaseDate = data.releaseDate
        isLoading.value = false
      })
      .catch((err) => console.log(err))
    

    onMounted(() => {
      if (store.state.accessToken !== "") {
        renderComments()
      } else {
        renderComments()
      }
      renderMovieDetails()
    })

    return {
      accessToken: computed(() => store.state.accessToken),
      comments,
      renderComments,
      movieDetails,
      movieId,
      isLoading
    }
  }
}
</script>