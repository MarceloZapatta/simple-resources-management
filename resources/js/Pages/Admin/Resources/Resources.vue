<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                Simple Resources Management
            </div>
        </header>
        <main>
            <div class="bg-white border-rounded m-6 p-4">
                <div class="my-4 flex">
                    <div class="w-1/2 p-2">
                        <label for="search">Search</label>
                        <input
                            data-testid="search"
                            type="text"
                            name="search"
                            class="custom-input"
                            v-model="search"
                            placeholder="Search by title or description"
                        />
                    </div>
                    <div class="w-1/2 p-2">
                        <label for="filter">Type Filter</label>
                        <v-select
                            v-model="resourceTypeIds"
                            :options="resourceTypes"
                            label="type"
                            data-testid="filter"
                            :reduce="(resourceType) => resourceType.id"
                            :multiple="true"
                        ></v-select>
                    </div>
                    <div v-if="isAdminPage">
                        <button
                            @click="this.addResource"
                            class="button button-primary mt-6"
                        >
                            Add
                        </button>
                    </div>
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
                                v-if="isAdminPage"
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
                                v-if="isAdminPage"
                            >
                                {{ this.getResourceDescription(resource) }}
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                {{ resource.resource_type.type }}
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                v-if="isAdminPage"
                            >
                                <button
                                    @click.prevent="editResource(resource)"
                                    class="button button-secondary"
                                >
                                    Edit
                                </button>
                                <button
                                    @click.prevent="deleteResource(resource)"
                                    class="button button-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td v-else>
                                <button
                                    class="button button-secondary"
                                    @click="handleViewResource(resource)"
                                >
                                    View
                                </button>
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
                <ResourcesEditModal
                    :isOpen="resourceEditing"
                    :resourceId="resourceEdit.id"
                    :resourceTypes="resourceTypes"
                    @onClose="handleCloseModal"
                />
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ResourcesLoading from "../../../Components/ResourcesLoading.vue";
import ResourcesEditModal from "../../../Components/ResourcesEditModal.vue";

const ResourceTypes = {
    PDF: 1,
    HTMLSnippet: 2,
    Link: 3,
};

export default {
    props: ["isAdminPage"],
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
            resourceEdit: {},
            page: 1,
        };
    },
    methods: {
        handlePageClick(page) {
            this.page = page;
        },
        fetchResources() {
            this.isLoading = true;

            let resourceTypesString = "";

            this.resourceTypeIds.forEach((resourceTypeId) => {
                resourceTypesString += `resource_type_id[]=${resourceTypeId}&`;
            });

            axios
                .get(
                    `/api/resources?page=${this.page}&search=${this.search}&${resourceTypesString}`
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
        handleCloseModal(refreshList) {
            this.resourceEdit = {};
            this.openEditResourceModal(false);

            if (refreshList) {
                this.fetchResources();
            }
        },
        editResource(resource) {
            this.resourceEdit = resource;
            this.openEditResourceModal();
        },
        deleteResource(resource) {
            this.$swal({
                title: "Are you sure?",
                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: "Cancel",
                focusConfirm: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`/api/resources/${resource.id}`)
                        .then(() => {
                            this.fetchResources();
                            this.$swal(
                                "Success!",
                                "Resource removed with success."
                            );
                        })
                        .catch((error) => this.showError());
                }
            });
        },
        addResource() {
            this.openEditResourceModal();
        },
        openEditResourceModal(open = true) {
            this.resourceEditing = open;
        },
        getResourceDescription(resource) {
            return resource && resource.description
                ? resource.description.length > 40
                    ? resource.description.substring(0, 40) + "..."
                    : resource.description
                : null;
        },
        handleViewResource(resource) {
            switch (resource.resource_type.id) {
                case ResourceTypes.PDF:
                    window.open(resource.file, "_blank");
                    break;
                case ResourceTypes.HTMLSnippet:
                    this.$swal({ text: resource.html_snippet });
                    break;
                case ResourceTypes.Link:
                    window.open(
                        resource.link,
                        resource.open_new_tab ? "_blank" : "_self"
                    );
                    break;
                default:
                    break;
            }
            if (resource.resource_type.id === ResourceTypes.PDF) {
                window.open(resource.file);
            }
        },
    },
    watch: {
        search(newSearch, oldSearch) {
            this.page = 1;
            this.fetchResources();
        },
        resourceTypeIds(newResourceTypeIds, oldResourceTypeIds) {
            this.page = 1;
            this.fetchResources();
        },
        page(oldValue, newValue) {
            if (newValue != oldValue && newValue != this.meta.page) {
                this.fetchResources();
            }
        },
    },
    mounted() {
        this.fetchResources();
        this.fetchResourceTypes();
    },
};
</script>
