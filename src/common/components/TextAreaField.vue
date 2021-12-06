<template>
  <div class="space-y-1">
    <Label
    :id="id"
    :label="label"
    />
    <TextArea
    :name="name"
    :id="id"
    :modelValue="modelValue"
    @input-changed="handleInput"
    />
  </div>
</template>

<script>
import Label from "./Label.vue"
import TextArea from "./TextArea.vue"

export default {
  components: {
    Label, 
    TextArea
  },
  props: ["id", "label", "name", "modelValue"],
  methods: {
    handleInput(value) {
      this.$emit("update:modelValue", value)
    }
  }
}
</script>