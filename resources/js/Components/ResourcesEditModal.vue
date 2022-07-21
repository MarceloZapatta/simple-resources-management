<template>
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        v-if="isOpen"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div
                class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
            >
                <div
                    class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h3
                                    class="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                >
                                    {{ this.resourceId ? "Edit" : "Add" }}
                                    Resource
                                </h3>
                                <div class="mt-2">
                                    <div>
                                        <label for="title">Type</label>
                                        <select
                                            name="resource_type_id"
                                            v-model="resource.resource_type.id"
                                            class="custom-input"
                                        >
                                            <option
                                                placeholder
                                                disabled
                                                selected
                                            >
                                                Select a option
                                            </option>
                                            <option
                                                v-for="resourceType in resourceTypes"
                                                v-bind:value="resourceType.id"
                                                v-bind:key="resourceType.id"
                                            >
                                                {{ resourceType.type }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="title">Title</label>
                                        <input
                                            name="title"
                                            type="text"
                                            class="custom-input"
                                            ref="title"
                                            v-model="resource.title"
                                        />
                                    </div>
                                    <div
                                        v-if="isHTMLSnippet"
                                    >
                                        <label for="description"
                                            >Snippet description</label
                                        >
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows="5"
                                            v-model="resource.description"
                                            class="custom-input"
                                        ></textarea>
                                    </div>
                                    <div
                                        v-if="isHTMLSnippet"
                                    >
                                        <label for="html_snippet"
                                            >HTML Snippet</label
                                        >
                                        <textarea
                                            name="html_snippet"
                                            id="html_snippet"
                                            rows="5"
                                            v-model="resource.html_snippet"
                                            class="custom-input"
                                        ></textarea>
                                    </div>
                                    <div
                                        v-if="isLink"
                                    >
                                        <label for="link">Link</label>
                                        <input
                                            name="link"
                                            type="text"
                                            class="custom-input"
                                            v-model="resource.link"
                                        />
                                    </div>
                                    <div
                                        v-if="isLink"
                                    >
                                        <label for="open_new_tab">
                                            <input
                                                name="open_new_tab"
                                                type="checkbox"
                                                v-model="resource.open_new_tab"
                                            />
                                            Open in a new tab
                                        </label>
                                    </div>
                                    <div
                                        v-if="isPdf"
                                    >
                                        <label for="file">File upload</label>
                                        <input
                                            type="file"
                                            class="custom-input"
                                            name="file"
                                        />
                                    </div>
                                    <p class="text-sm text-gray-500">
                                        Are you sure you want to deactivate your
                                        account? All of your data will be
                                        permanently removed. This action cannot
                                        be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            {{ this.resourceId ? "Edit" : "Add" }}
                        </button>
                        <button
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="handleClose"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const ResourceTypes = {
    PDF: 1,
    HTMLSnippet: 2,
    Link: 3,
};

export default {
    props: ["isOpen", "resourceId", "resourceTypes"],
    data() {
        return {
            isLoading: false,
            resource: {
                resource_type: {},
            },
        };
    },
    methods: {
        fetchResource() {
            this.isLoading = true;

            axios
                .get(`/api/resources/${this.resourceId}`)
                .then((response) => (this.resource = response.data.data))
                .finally(() => (this.isLoading = false));
        },
        async handleClose() {
            this.resource = {
                resource_type: {},
            };
            this.$emit("onClose");
        },
    },
    mounted() {
        if (this.resourceId) {
            this.fetchResource();
        }
    },
    computed: {
        isHTMLSnippet() {
            return (
                this.resource &&
                this.resource.resource_type.id === ResourceTypes.HTMLSnippet
            );
        },
        isPDF() {
            return (
                this.resource &&
                this.resource.resource_type.id === ResourceTypes.PDF
            );
        },
        isLink() {
            return (
                this.resource &&
                this.resource.resource_type.id === ResourceTypes.Link
            );
        },
    },
    updated() {
        if (this.resourceId && this.resourceId !== this.resource.id) {
            this.fetchResource();
        }
    },
};
</script>
