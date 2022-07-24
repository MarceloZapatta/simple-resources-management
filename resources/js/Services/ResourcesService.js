import axios from "axios";

export default class ResourcesService {
    static find(resourceId) {
        return axios.get(`/api/resources/${resourceId}`);
    }

    static update(resource, file) {
        const formData = this.generateFormData(resource, file);

        return axios.put(`/api/resources/${resource.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    static store(resource, file) {
        const formData = this.generateFormData(resource, file);

        return axios.post(`/api/resources`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    static generateFormData(resource, file) {
        const formData = new FormData();

        formData.append("resource_type_id", resource.resource_type.id);

        if (resource.title) {
            formData.append("title", resource.title);
        }

        if (resource.link) {
            formData.append("link", resource.link);
        }

        if (resource.description) {
            formData.append("description", resource.description);
        }

        if (resource.html_snippet) {
            formData.append("html_snippet", resource.html_snippet);
        }

        if (resource.open_new_tab) {
            formData.append("open_new_tab", resource.open_new_tab || false);
        }

        if (file) {
            formData.append("file", file);
        }

        return formData;
    }
}
