import "./../css/app.css";
import "./bootstrap";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from "vue";

import "vue-awesome-paginate/dist/style.css";
import "vue-select/dist/vue-select.css";

import VueAwesomePaginate from "vue-awesome-paginate";
import Resources from "./Pages/Admin/Resources/Resources.vue";
import VueSelect from "vue-select";

const app = createApp(Resources, { ...window.vueConfig })
    .use(VueAwesomePaginate)
    .use(VueSweetalert2)
    .component("v-select", VueSelect)
    .mount("#app");
