<template>
  <form class="p-6" @submit.prevent="handleSubmit">
    <div class="text-3xl mt-4 mb-8 font-extrabold text-center">Register</div>

    <p v-if="form.errorMessage !== ''" class="text-red-600 mb-5">{{ form.errorMessage }}</p> 
    <div class="space-y-6">
      <InputField 
      id="name"
      type="text"
      name="name"
      required="true"
      label="Name"
      v-model="form.name"
      />
      <InputField 
      id="email"
      type="text"
      name="email"
      required="true"
      label="Email"
      v-model="form.email"
      />
      <InputField 
      id="password"
      type="password"
      name="password"
      required="true"
      label="Password"
      v-model="form.password"
      />
      <InputField 
      id="avatar"
      type="text"
      name="avatar"
      required="true"
      label="Your Avatar Link"
      v-model="form.avatar"
      />
      <Button 
      type="submit"
      class="w-full border-transparent text-white bg-pink-600 hover:bg-pink-700"
      >
        Register
      </Button>
    </div>
  </form>
</template>

<script>
import { reactive } from "vue"
import { useRouter } from "vue-router"

import InputField from "@/common/components/InputField.vue"
import Button from "@/common/components/Button.vue"

import { registerUser } from "@/services/auth.js"

export default {
  components: {
    InputField,
    Button
  },
  setup() {
    const router = useRouter()

    const form = reactive({
      name: "",
      email: "",
      password: "",
      avatar: "",
      errorMessage: ""
    })
    

    const handleSubmit = () =>
      registerUser(form)
      .then((data) => {
        if (data.name) {
          if (form.errorMessage !== "") {
            form.errorMessage = ""
          }
          router.push("/login")
        } else {
          throw new Error(data.message)
        }
      })
      .catch((err) => form.errorMessage = err)

    return {
      form,
      handleSubmit
    }
  }
}

</script>