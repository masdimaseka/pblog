<script setup>
const props = defineProps({
  inputTitle: String,
  inputName: String,
  inputPlaceholder: String,
  inputType: String,
  modelValue: [String, Number],
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label :for="props.inputName">{{ props.inputTitle }}</label>
    <input
      :type="props.inputType"
      class="input-text"
      :placeholder="props.inputPlaceholder"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped></style>
