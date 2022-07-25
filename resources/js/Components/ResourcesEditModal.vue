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
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"
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
                                            required
                                            v-bind:class="{
                                                '!border-red-600':
                                                    errors.resource_type_id,
                                            }"
                                            data-testid="select-type"
                                            v-if="resource.resource_type"
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
                                        <Error
                                            :error="errors.resource_type_id"
                                        />
                                    </div>
                                    <div>
                                        <label for="title">Title</label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            class="custom-input"
                                            ref="title"
                                            v-bind:class="{
                                                '!border-red-600': errors.title,
                                            }"
                                            v-model="resource.title"
                                            data-testid="input-title"
                                        />
                                        <Error :error="errors.title" />
                                    </div>
                                    <div v-if="isHTMLSnippet">
                                        <label for="description"
                                            >Snippet description</label
                                        >
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows="5"
                                            v-model="resource.description"
                                            class="custom-input"
                                            v-bind:class="{
                                                '!border-red-600':
                                                    errors.description,
                                            }"
                                            data-testid="textarea-description"
                                        ></textarea>
                                        <Error :error="errors.description" />
                                    </div>
                                    <div v-if="isHTMLSnippet">
                                        <label for="html_snippet"
                                            >HTML Snippet</label
                                        >
                                        <textarea
                                            name="html_snippet"
                                            id="html_snippet"
                                            rows="5"
                                            v-model="resource.html_snippet"
                                            class="custom-input"
                                            v-bind:class="{
                                                '!border-red-600':
                                                    errors.html_snippet,
                                            }"
                                            data-testid="textarea-html-snippet"
                                        ></textarea>
                                        <Error :error="errors.html_snippet" />
                                    </div>
                                    <div v-if="isLink">
                                        <label for="link">Link</label>
                                        <input
                                            id="link"
                                            name="link"
                                            type="url"
                                            class="custom-input"
                                            data-testid="input-link"
                                            v-bind:class="{
                                                '!border-red-600': errors.link,
                                            }"
                                            v-model="resource.link"
                                        />
                                        <Error :error="errors.link" />
                                    </div>
                                    <div v-if="isLink">
                                        <label for="open_new_tab">
                                            <input
                                                name="open_new_tab"
                                                type="checkbox"
                                                v-model="resource.open_new_tab"
                                                data-testid="checkbox-open-new-tab"
                                                v-bind:class="{
                                                    '!border-red-600':
                                                        errors.open_new_tab,
                                                }"
                                            />
                                            Open in a new tab
                                        </label>
                                    </div>
                                    <Error :error="errors.open_new_tab" />
                                    <div v-if="isPDF">
                                        <label for="file">File upload</label>
                                        <input
                                            ref="file"
                                            type="file"
                                            name="file"
                                            data-testid="input-file"
                                            class="custom-input"
                                            accept="application/pdf"
                                            v-bind:class="{
                                                '!border-red-600': errors.file,
                                            }"
                                            @change="handleChangeFile"
                                        />
                                    </div>
                                    <Error :error="errors.file" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            class="button button-primary"
                            data-testid="button-submit"
                            @click="submit"
                            :disabled="isLoading"
                        >
                            {{ this.resourceId ? "Edit" : "Add" }}
                        </button>
                        <button
                            type="button"
                            class="button button-secondary"
                            data-testid="button-cancel"
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
import Error from "./Error.vue";
import ResourcesService from "./../Services/ResourcesService.js";

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
                resource_type: {
                    id: null
                },
            },
            file: null,
            errors: {},
        };
    },
    components: {
        Error,
    },
    methods: {
        fetchResource() {
            this.isLoading = true;

            ResourcesService.find(this.resourceId)
                .then((response) => (this.resource = response.data.data))
                .catch(this.showError)
                .finally(() => (this.isLoading = false));
        },
        submit() {
            this.errors = {};

            return this.resource && this.resource.id
                ? this.updateResource()
                : this.storeResource();
        },
        updateResource() {
            this.isLoading = true;

            ResourcesService.update(this.resource, this.file)
                .then((response) => {
                    this.$swal("Success!", "Resource updated.").then(
                        this.handleClose(true)
                    );
                })
                .catch(this.handleApiErrors)
                .finally(() => (this.isLoading = false));
        },
        storeResource() {
            this.isLoading = true;

            ResourcesService.store(this.resource, this.file)
                .then((response) => {
                    this.$swal("Success!", "Resource created.").then(
                        this.handleClose(true)
                    );
                })
                .catch(this.handleApiErrors)
                .finally(() => (this.isLoading = false));
        },
        async handleClose(refreshList = false) {
            this.resource = {
                resource_type: {},
            };
            this.errors = {};
            this.$emit("onClose", refreshList);
        },
        handleChangeFile() {
            if (this.$refs.file.files && this.$refs.file.files.length > 0) {
                this.file = this.$refs.file.files[0];
            }
        },
        handleApiErrors(error) {
            if (
                error &&
                error.response &&
                error.response.status === 422 &&
                error.response.data &&
                error.response.data.errors
            ) {
                let errorsMap = {};
                Object.entries(error.response.data.errors).forEach((item) => {
                    errorsMap[item[0]] = item[1][0];
                });
                this.errors = errorsMap;
                return;
            }
            this.showError();
        },
        showError() {
            this.$swal("An error ocurred!", "Please try again later.");
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
                this.resource.resource_type &&
                this.resource.resource_type.id === ResourceTypes.HTMLSnippet
            );
        },
        isPDF() {
            return (
                this.resource &&
                this.resource.resource_type &&
                this.resource.resource_type.id === ResourceTypes.PDF
            );
        },
        isLink() {
            return (
                this.resource &&
                this.resource.resource_type &&
                this.resource.resource_type.id === ResourceTypes.Link
            );
        },
    },
    updated() {
        if (
            this.resourceId &&
            this.resourceId !== this.resource.id &&
            !this.isLoading
        ) {
            this.fetchResource();
        }
    },
};
</script>
