import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        Vue({
            compilerOptions: {
                isCustomElement: (tag) =>
                    ["vue-awesome-paginate"].includes(tag),
            },
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
    },
    root: "./resources/js", //Define the root
});
