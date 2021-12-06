<template>
  <form class="p-6" @submit.prevent="handleSubmit">
    <p v-if="form.errorMessage !== ''" class="text-red-600 mb-5">{{ form.errorMessage }}</p>    
    <div class="space-y-6">
      <InputField 
      type="number"
      id="rating"
      name="rating"
      label="Rating (1 to 5)"
      required="true"
      v-model.number="form.rating"
      />
      <TextAreaField
      id="content"
      name="content"
      label="Comment"
      required="false"
      v-model="form.content"
      />
      <Button
      type="submit"
      class="border-transparent text-white bg-pink-600 hover:bg-pink-700"
      >
        Submit
      </Button>
    </div>
  </form>

</template>

<script>
import { reactive } from "vue"
import { useStore } from "vuex"

import InputField from "@/common/components/InputField.vue"
import TextAreaField from "@/common/components/TextAreaField.vue"
import Button from "@/common/components/Button.vue"

import { addComment } from "../movies.service.js"

export default {
  components: {
    InputField,
    TextAreaField,
    Button
  },
  props: ["id"],
  setup(props, { emit }) {
    const form = reactive({
      rating: "",
      movieId: props.id,
      content: "",
      errorMessage: ""
    })

    const store = useStore()
    const accessToken = store.state.accessToken
  
    const resetInputs = () => {
      form.rating = ""
      form.content = ""
    }

    const handleSubmit = () =>
      addComment(accessToken, form)
      .then((data) => {
        if (data.rating) {
          if (form.errorMessage !== "") {
            form.errorMessage = ""
          }
        } else {
          throw new Error(data.message)
        }
      })
      .then(() => emit("comment-submitted"))
      .then(resetInputs)
      .catch((err) => form.errorMessage = err)

    return {
      form,
      handleSubmit
    }

  }
}

</script>
