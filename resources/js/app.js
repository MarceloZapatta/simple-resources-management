import "./../css/app.css";
import "./bootstrap";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

import { createApp } from "vue";

import "vue-awesome-paginate/dist/style.css";

import VueAwesomePaginate from "vue-awesome-paginate";
import Resources from "./Pages/Admin/Resources/Resources.vue";

const admin = createApp(Resources)
    .use(VueAwesomePaginate)
    .mount("#admin");
