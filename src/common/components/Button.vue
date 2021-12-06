<template>
  <button 
  :type="type"
  class="
  inline-flex
  justify-center 
  items-center
  py-2 px-4
  border
  shadow-sm
  text-sm
  font-medium
  rounded-md
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-pink-500
  "
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"]
}
</script>