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
    <textarea
      :type="props.inputType"
      class="input-text resize-none h-[20vh]"
      :placeholder="props.inputPlaceholder"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<style scoped></style>
