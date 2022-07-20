import './../css/app.css';
import "./bootstrap";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue'
import Resources from "./Pages/Admin/Resources/Resources.vue";

const admin = createApp(Resources)
admin.mount('#admin');

