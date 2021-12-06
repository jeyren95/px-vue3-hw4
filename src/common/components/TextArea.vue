<template>
  <textarea
  class="
  block 
  shadow-sm
  sm:text-sm
  focus:ring-pink-500
  focus:border-pink-500
  border-gray-300
  rounded-md
  h-52
  w-full
  "
  :name="name"
  :id="id"
  :value="modelValue"
  @input="handleInput"
  >
  </textarea>
</template>

<script>
export default {
  props: ["name", "id", "modelValue"],
  methods: {
    handleInput(e) {
      this.$emit("input-changed", e.target.value)
    }
  }
}
</script>