<template>
  <form class="p-6" @submit.prevent="handleSubmit">
    <div class="text-3xl mt-4 mb-8 font-extrabold text-center">Login</div>

    <p v-if="form.errorMessage !== ''" class="text-red-600 mb-5">{{ form.errorMessage }}</p> 
    <div class="space-y-6">
      <InputField 
      id="email"
      type="text"
      name="email"
      required="true"
      label="Email"
      v-model="form.username"
      />
      <InputField 
      id="password"
      type="password"
      name="password"
      required="true"
      label="Password"
      v-model="form.password"
      />
      <Button 
      type="submit"
      class="w-full border-transparent text-white bg-pink-600 hover:bg-pink-700"
      >
        Login
      </Button>
    </div>
  </form>
</template>

<script>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

import InputField from "@/common/components/InputField.vue"
import Button from "@/common/components/Button.vue"

import { loginUser, getCurrentUser } from "@/services/auth.js"

export default {
  components: {
    InputField,
    Button
  },
  setup() {
    const form = reactive({
      username: "",
      password: "",
      errorMessage: ""
    })
    const router = useRouter()
    const store = useStore()

    const setCurrentUser = () => 
      getCurrentUser(store.state.accessToken)
      .then((data) => store.commit("setCurrentUser", { user: data.name }))
      .catch((err) => console.log(err))


    const handleSubmit = () =>
      loginUser(form)
      .then((data) => {
        if (data.access_token) {
          if (form.errorMessage !== "") {
            form.errorMessage = ""
          }
          store.commit("loginUser", { accessToken: data.access_token })
          localStorage.setItem("accessToken", data.access_token)
          router.push("/")
        } else {
          throw new Error(data.message)
        }
      })
      .then(setCurrentUser)
      .catch((err) => form.errorMessage = err)

      return {
        form,
        handleSubmit
      }
  }

}
</script>