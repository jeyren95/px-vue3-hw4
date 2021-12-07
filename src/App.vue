<template>
  <header class="md:sticky md:top-0 bg-white md:z-10">
    <div class="px-4">
      <div class="flex justify-between items-center py-2 max-w-7xl mx-auto border-b border-gray-200">
        <nav v-if="accessToken === ''" class="flex items-center">
          <router-link to="/" class="text-xl inline-block mr-4 font-bold text-pink-700 hover:text-pink-900">
            Movies App
          </router-link>
          <router-link to="/login">
            <Button 
            type="button"
            class="border-transparent text-white bg-pink-600 hover:bg-pink-700 mx-3"
            >
              Login
            </Button>
          </router-link>
          <router-link to="/register">
            <Button 
            type="button"
            class="border-pink-500 text-pink-500 bg-white hover:text-pink-700 mx-3"
            >
              Register
            </Button>
          </router-link>
        </nav>

        <nav v-else class="flex items-center">
          <router-link to="/" class="text-xl inline-block mr-4 font-bold text-pink-700 hover:text-pink-900">
            Movies App
          </router-link>
          <router-link to="/">
            <Button 
            type="button"
            class="border-transparent text-white bg-pink-600 hover:bg-pink-700"
            @click="logoutUser"
            >
              Logout
            </Button>
          </router-link>
        </nav>

        <p v-if="accessToken !== ''">You are logged in as <span class="font-bold text-pink-700">{{ currentUser }}</span></p>
      </div>
    </div>
  </header>

  <router-view />
</template>

<script>
import { onMounted, computed } from "vue"
import { useStore } from "vuex"

import Button from "@/common/components/Button.vue"

import { getCurrentUser } from "@/services/auth.js"

export default {
  name: "App",
  components: {
    Button
  },
  setup() {
    const store = useStore()

    const logoutUser = () => {
      store.commit("logoutUser")
      localStorage.removeItem("accessToken")
    }
    
    const setCurrentUser = () => 
      getCurrentUser(store.state.accessToken)
      .then((data) => store.commit("setCurrentUser", { user: data.name }))
      .catch((err) => console.log(err))

    onMounted(() => {
      if (localStorage.getItem("accessToken")) {
        store.commit("loginUser", { accessToken: localStorage.getItem("accessToken")})
        setCurrentUser()
      }
    }) 
    
    return {
      accessToken: computed(() => store.state.accessToken),
      currentUser: computed(() => store.state.currentUser),
      logoutUser
    }
  }
}

</script>
