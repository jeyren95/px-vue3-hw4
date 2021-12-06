<template>
  <label 
  class="block text-sm font-medium text-gray-900"
  :for="id"
  >
    {{ label }}
  </label>
</template>

<script>
export default {
  props: ["id", "label"]
}

</script>