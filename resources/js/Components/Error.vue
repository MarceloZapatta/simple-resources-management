<template>
    <span class="error" v-if="error">{{ error }}</span>
</template>

<script>
export default {
    props: ['error']
}
</script>
