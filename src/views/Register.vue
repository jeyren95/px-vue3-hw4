<template>
  <div class="max-w-md mx-auto m-6 shadow">
    <RegisterForm /> 
  </div>
</template>

<script>
import RegisterForm from "@/modules/auth/components/RegisterForm.vue"

export default {
  name: "Register",
  components: {
    RegisterForm
  }
}

</script>