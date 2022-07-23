export default class ResourcesService {
    static fetch() {
        return axios.get(
            `/api/resources?page=${this.page}&search=${this.search}&${resourceTypesString}`
        );
    }
}
