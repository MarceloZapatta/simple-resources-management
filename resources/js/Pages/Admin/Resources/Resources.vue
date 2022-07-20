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
                    <input type="text" name="search" >

                    <label for="filter">Filter Type</label>
                    <select>
                        <option>
                            Select a option
                        </option>
                        <option>
                            PDF
                        </option>
                    </select>

                    <button>Add</button>
                </div>
                <table min-w-full divide-y divide-gray-300>
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
                    <tbody>
                        <tr>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                Resource 1
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                Resource 2
                            </td>
                            <td
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                                PDF
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
                    :total-items="50"
                    :items-per-page="5"
                    :max-pages-shown="5"
                    :current-page="1"
                    :on-click="() => null"
                />
            </div>
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log("Component mounted.");
    },
};
</script>
