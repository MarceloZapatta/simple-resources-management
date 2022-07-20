
<template>
    <div class="min-h-screen bg-gray-100">
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    TESTE HEADER!
                </div>
            </header>
            <main>
                <div style="height: 50px; width: 50px" class="bg-red-100"></div>
            </main>
        </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>