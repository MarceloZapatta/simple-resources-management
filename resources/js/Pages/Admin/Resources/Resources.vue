<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                Simple Resources Management
            </div>
        </header>
        <main>
            <div class="bg-white border-rounded m-6 p-4">
                <div class="m-4">
                    <label for="search">Search</label>
                    <input type="text" name="search" />

                    <label for="filter">Filter Type</label>
                    <select>
                        <option>Select a option</option>
                        <option>PDF</option>
                    </select>

                    <button>Add</button>
                </div>
                <table class="divide-y divide-gray-300 w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                Title
                            </th>
                            <th
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                Description
                            </th>
                            <th
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                Type
                            </th>
                            <th
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            ></th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <ResourcesLoading />
                    </tbody>
                    <tbody v-else>
                        <tr
                            v-if="
                                !isLoading &&
                                (!resources || resources.length <= 0)
                            "
                        >
                            <td colspan="4">No resources found.</td>
                        </tr>
                        <tr
                            v-for="resource in resources"
                            v-bind:key="resource.id"
                        >
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                {{ resource.title }}
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                {{
                                    resource.description.length > 40
                                        ? resource.description.substring(
                                              0,
                                              40
                                          ) + "..."
                                        : resource.description
                                }}
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                {{ resource.resource_type.type }}
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                <button>Edit</button>
                                <button>Download</button>
                                <button>Open</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <vue-awesome-paginate
                    v-if="meta && meta.last_page > 1"
                    :total-items="meta.total"
                    :items-per-page="meta.per_page"
                    :max-pages-shown="5"
                    :current-page="meta.current_page"
                    :on-click="fetchResources"
                />
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ResourcesLoading from "../../../Components/ResourcesLoading.vue";

export default {
    components: {
        ResourcesLoading,
    },
    data() {
        return {
            resources: [],
            meta: {},
            isLoading: false,
        };
    },
    computed: {
        console: () => console,
    },
    methods: {
        fetchResources(page = 1) {
            this.isLoading = true;
            axios
                .get(`/api/resources?page=${page}`)
                .then((response) => {
                    this.resources = response.data.data;
                    console.error(this.resources);
                    this.meta = response.data.meta;
                })
                .finally(() => (this.isLoading = false));
        },
    },
    mounted() {
        this.fetchResources(1);
    },
};
</script>
