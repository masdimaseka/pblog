<script setup>
const props = defineProps({
  type: String,
  message: String,
});
</script>

<template>
  <div class="mx-auto pt-[10vh] w-full flex justify-center fixed z-10">
    <div
      class="p-4 bg-[var(--danger-color)] drop-shadow-md rounded-lg border-4 border-[var(--danger-bg)]"
      role="alert"
      v-show="props.type == 'danger'"
    >
      <div class="flex justify-center items-center gap-4 mx-[5vw]">
        <v-icon name="md-info" fill="white" scale="1.2" />
        <h5 class="mb-0 text-white">
          {{ props.message }}
        </h5>
      </div>
    </div>

    <div
      class="p-4 mb-4 bg-[var(--warning-bg)] rounded-lg fixed z-10"
      role="alert"
      v-show="props.type == 'warning'"
    >
      <div class="flex justify-center">
        <v-icon name="md-info" fill="#ff983f" scale="1.2" />
        <h5 class="mb-0">
          {{ props.message }}
        </h5>
      </div>
    </div>

    <div
      class="p-4 bg-[var(--success-color)] drop-shadow-md rounded-lg border-4 border-[var(--success-bg)]"
      role="alert"
      v-show="props.type == 'success'"
    >
      <div class="flex justify-center items-center gap-4 mx-[5vw]">
        <v-icon name="md-info" fill="white" scale="1.2" />
        <h5 class="mb-0 text-white">
          {{ props.message }}
        </h5>
      </div>
    </div>

    <div
      class="p-4 mb-4 bg-[var(--primary-color)] rounded-lg fixed z-10"
      role="alert"
      v-show="props.type == 'confirm'"
    >
      <div class="flex justify-center">
        <v-icon name="md-info" fill="white" scale="1.2" class="mr-3" />
        <p class="mr-20 text-white">
          {{ props.message }}
        </p>
      </div>
    </div>
  </div>
</template>
