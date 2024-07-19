<script setup>
import { useRoute } from "vue-router";
import { baseUrl, token } from "@/helper/GlobalVariable";

import axios from "axios";

const prop = defineProps({
  title: String,
  content: String,
  blog_id: Number,
  slug: String,
  image: String,
  created_at: String,
});

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const router = useRoute().name;

const deleteBlog = async () => {
  if (confirm("Hapus?")) {
    try {
      const response = await axios.delete(baseUrl + "/blog/" + prop.blog_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div
    class="group card rounded-xl drop-shadow-md bg-white p-2 overflow-hidden"
  >
    <div class="card-content">
      <div class="aspect-w-4 aspect-h-3">
        <img :src="prop.image" alt="" class="rounded-lg object-cover" />
      </div>
      <div class="m-3">
        <h1
          class="group-hover:text-[var(--secondary-color)] text-xl font-bold truncate my-1"
        >
          {{ prop.title }}
        </h1>
        <p class="text-base truncate mb-3">{{ prop.content }}</p>
        <p class="text-sm truncate">{{ formatDate(prop.created_at) }}</p>
        <div v-show="router == 'author-dashboard'" class="mt-6 flex gap-3">
          <router-link
            :to="/blog/ + 'update/' + slug"
            class="btn-other bg-[var(--success-color)]"
            >update</router-link
          >
          <button
            class="btn-other bg-[var(--danger-color)]"
            @click="deleteBlog"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
