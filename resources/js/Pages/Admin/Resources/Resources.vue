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
                    <input
                        data-testid="search"
                        type="text"
                        name="search"
                        class="custom-input"
                        v-model="search"
                        placeholder="Search by title or description"
                    />

                    <label for="filter">Filter Type</label>
                    <v-select
                        v-model="resourceTypeIds"
                        :options="resourceTypes"
                        label="type"
                        data-testid="filter"
                        :reduce="resourceType => resourceType.id"
                        multiple="true"></v-select>
                    <!-- <select
                        v-model="resourceTypeIds"
                        class="custom-input"
                        data-testid="filter"
                        multiple
                    >
                        <option value="">Filter by type</option>
                        <option
                            v-for="resourceType in resourceTypes"
                            v-bind:key="resourceType.id"
                            v-bind:value="resourceType.id"
                        >
                            {{ resourceType.type }}
                        </option>
                    </select> -->

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
                            <td
                                colspan="4"
                                className="text-gray-500 text-center px-3 py-4 text-sm"
                            >
                                No resources found.
                            </td>
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
                <ResourcesEditModal :isOpen="false" />
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ResourcesLoading from "../../../Components/ResourcesLoading.vue";
import ResourcesEditModal from "../../../Components/ResourcesEditModal.vue";

export default {
    components: {
        ResourcesLoading,
        ResourcesEditModal,
    },
    data() {
        return {
            search: "",
            resources: [],
            resourceTypes: [],
            resourceTypeIds: [],
            meta: {},
            isLoading: false,
            resourceEditing: false,
        };
    },
    methods: {
        fetchResources(page = 1) {
            this.isLoading = true;

            let resourceTypesString = "";

            this.resourceTypeIds.forEach((resourceTypeId) => {
                resourceTypesString += `resource_type_id[]=${resourceTypeId}&`;
            });

            axios
                .get(
                    `/api/resources?page=${page}&search=${this.search}&${resourceTypesString}`
                )
                .then((response) => {
                    this.resources = response.data.data;
                    this.meta = response.data.meta;
                })
                .catch(this.showError)
                .finally(() => (this.isLoading = false));
        },
        fetchResourceTypes() {
            this.isLoadingResourceTypes = true;
            axios
                .get("/api/resource-types")
                .then((response) => {
                    this.resourceTypes = response.data.data;
                })
                .catch(this.showError)
                .finally(() => (this.isLoadingResourceTypes = false));
        },
        showError() {
            this.$swal("An error ocurred!", "Please try again later.");
        },
    },
    watch: {
        search(newSearch, oldSearch) {
            const firstPage = 1;
            this.fetchResources(firstPage);
        },
        resourceTypeIds(newResourceTypeIds, oldResourceTypeIds) {
            const firstPage = 1;
            this.fetchResources(firstPage);
        },
    },
    mounted() {
        this.fetchResources(1);
        this.fetchResourceTypes();
    },
};
</script>
