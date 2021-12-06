<template>
  <div class="max-w-md mx-auto m-6 shadow">
    <LoginForm /> 
  </div>
</template>

<script>
import LoginForm from "@/modules/auth/components/LoginForm.vue"

export default {
  name: "Login",
  components: {
    LoginForm
  }
}
</script>