<template>
    <span class="error" v-if="error">{{ error }}</span>
</template>

<script>
import './Error.css';

export default {
    props: ['error']
}
</script>
