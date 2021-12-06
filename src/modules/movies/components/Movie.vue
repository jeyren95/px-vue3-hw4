<template>
  <div class="relative flex flex-col">
    <div
    class="
    group
    block 
    w-full
    rounded-lg
    bg-gray-100
    focus-within:ring-2
    focus-within:ring-offset-2
    focus-within:ring-offset-gray-100
    focus-within:ring-pink-500
    overflow-hidden
    ">
      <img :src="posterUrl" alt />
    </div>
    <div 
    class="
    flex-1 flex
    md:flex-col
    justify-between
    items-start
    md:items-stretch
    gap-3
    px-2
    "
    >
      <div class="mt-1 flex-1">
        <div class="flex justify-between items-center gap-3">
          <div>
            <span class="text-2xl font-bold">{{ title }}</span>
          </div>
        </div>
        <p class="block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {{ releaseDate }}
        </p>
        <p class="block text-sm font-medium text-gray-500 pointer-events-none">
          {{ overview }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-3 py-3">
        <router-link :to="{ name: 'Movie', params: { id: id } }">
          <Button 
          type="button"
          class="border-transparent text-white bg-pink-600 hover:bg-pink-700"
          >
            
            Learn More
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/common/components/Button.vue"

export default {
  components: {
    Button
  },
  props: ["id", "posterUrl", "title", "overview", "releaseDate"]
}
</script>