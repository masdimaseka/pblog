import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
import { OhVueIcon } from "./helper/icons"; // Impor dari file icons.js

const app = createApp(App);

app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
