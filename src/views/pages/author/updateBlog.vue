<script setup>
import baseInput from "@/components/baseInput.vue";
import baseTextArea from "@/components/baseTextArea.vue";
import Loading from "@/components/loading.vue";
import Alert from "@/components/alert.vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { baseUrl, token } from "@/helper/GlobalVariable";

const input = reactive({
  title: "",
  content: "",
  image: null,
});

const slug = useRoute().params.slug;
const isLoading = ref(false);
const previewImage = ref(null);
const router = useRouter();
const blogId = ref(null);
const isSuccess = ref(false);

const hideAlert = () => {
  setTimeout(() => {
    isSuccess.value = false;
    router.push("/dashboard");
  }, 1000);
};

const getDataDetail = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(baseUrl + "/blog/" + slug);
    if (response.status == 200) {
      input.title = response.data.title;
      input.content = response.data.content;
      previewImage.value = response.data.image;
      blogId.value = response.data.id;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getDataDetail();
});

const updateBlog = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title", input.title);
    formData.append("content", input.content);
    if (input.image) {
      formData.append("image", input.image);
    }
    const response = await axios.post(
      baseUrl + "/blog/" + blogId.value,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      isLoading.value = false;
      isSuccess.value = true;
      hideAlert();
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
    input.image = file;
  } else {
    previewImage.value = null;
    input.image = null;
  }
};
</script>

<template>
  <Alert v-show="isSuccess" type="success" message="Blog has been updated" />
  <div class="mx-auto pt-[15vh] mb-40 lg:pt-[20vh] container">
    <div class="flex justify-center items-center">
      <form
        @submit.prevent="updateBlog"
        action=""
        class="bg-white rounded-xl drop-shadow-md flex gap-16 p-6 lg:p-4 max-lg:w-full"
      >
        <div
          class="justify-center content-center gap-16 w-[30vw] hidden lg:flex"
        >
          <div
            v-if="!previewImage"
            class="border-2 rounded-lg w-full h-full lg:flex justify-center items-center hidden"
          >
            <p>Preview Image</p>
          </div>

          <div v-if="previewImage" class="content-center">
            <img :src="previewImage" class="rounded-lg h-[70vh] object-cover" />
          </div>
        </div>

        <div class="flex flex-col gap-6 w-full lg:w-[24vw]">
          <h5 class="font-bold text-xl mb-0 text-[var(--primary-color)]">
            Update Blog
          </h5>
          <div
            class="card rounded-xl drop-shadow-md bg-white p-2 overflow-hidden mb-10 block lg:hidden"
          >
            <div class="card-content" v-if="previewImage">
              <div class="aspect-w-8 aspect-h-4 lg:aspect-w-16 lg:aspect-h-5">
                <img
                  :src="previewImage"
                  alt=""
                  class="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <baseInput
            v-model="input.title"
            inputType="text"
            inputPlaceholder="enter blog title..."
            inputTitle="blog title"
            inputName="blogTitle"
          />
          <baseTextArea
            v-model="input.content"
            inputType="text"
            inputPlaceholder="enter blog content..."
            inputTitle="blog content"
            inputName="blogContent"
          />
          <input
            type="file"
            name="image"
            id="image"
            @change="handleImageChange"
            class="mb-6"
          />

          <button class="btn-primary" type="submit">
            <div role="status" v-if="isLoading" class="flex justify-center">
              <Loading />
            </div>
            <span v-else>Update</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
