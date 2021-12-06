<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md mb-3">
    <div class="px-4 py-4 flex items-center sm:px-6">
      <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="text-sm leading-5 font-medium text-pink-600 truncate">
            <span>{{ currentUser }}</span>
          </div> 
          <div class="mt-2 flex">
            <StarIcon v-for="(number, index) in rating" :key="index" class="h-5 w-5 text-yellow-300" />
            <StarIcon v-for="(number, index) in (5 - rating)" :key="index" class="h-5 w-5 text-gray-300" />
          </div>
          <div class="mt-2 flex">
            <div class="flex items-center gap-2 text-sm leading-5 text-gray-700">
              <span>{{ content }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ml-5 flex-shrink-0 inline-flex items-center justify-center gap-2">
        <Button 
        type="button"
        class="border-transparent text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
        @click="removeComment"
        >
          <TrashIcon class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"

import Button from "@/common/components/Button.vue"
import { TrashIcon, StarIcon } from "@heroicons/vue/solid"

import { deleteComment } from "../movies.service.js"

export default {
  components: {
    Button,
    TrashIcon,
    StarIcon
  },
  props: ["rating", "content", "id"],
  setup(props, { emit }) {
    const store = useStore()

    const removeComment = () =>
      deleteComment(store.state.accessToken, props.id) 
      .then(() => emit("comment-deleted"))
      .catch((err) => console.log(err))

    return {
      currentUser: computed(() => store.state.currentUser),
      removeComment,
      accessToken: computed(() => store.state.accessToken),
    }
  }
}
</script>