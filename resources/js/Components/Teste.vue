<template>
    <div>
        Teste
        <select data-testid="select-type" v-model="teste">
            <option value="1">Teste</option>
        </select>
        <div v-if="teste === '1'">PDF</div>
    </div>
</template>

<script>
export default {
    props: ["isOpen", "resourceId", "resourceTypes"],
    data() {
        return {
            teste: "blabla",
        };
    },
};
</script>
