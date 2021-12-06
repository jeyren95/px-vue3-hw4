<template>
  <div class="space-y-1">
    <Label 
    :id="id"
    :label="label"
    />
    <Input 
    :id="id"
    :type="type"
    :name="name"
    :required="required"
    :modelValue="modelValue"
    @input-changed="handleInput"
    />
  </div>
</template>

<script>
import Input from "./Input.vue"
import Label from "./Label.vue"

export default {
  props: ["id", "type", "name", "required", "label", "modelValue"],
  components: {
    Input,
    Label
  },
  methods: {
    handleInput(value) {
      this.$emit("update:modelValue", value)
    }
  }
}

</script>