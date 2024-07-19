<script setup>
import Header from "@/components/layouts/header.vue";
import Footer from "@/components/layouts/footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
</template>
