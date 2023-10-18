import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import App from "./App.vue";
import axios from "axios";

const app = createApp(App);
const http = axios.create({
  baseURL: "http://localhost:3000", // 设置Axios的基本URL
});

app.config.globalProperties.$http = axios;
app.provide("http", http); // 在根实例中使用provide
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(router);
app.mount("#app");
