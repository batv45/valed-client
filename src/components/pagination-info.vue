<script setup>
defineProps({
    meta:{
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="align-self-center">
        <span v-if="meta.total > 0">{{meta.total}} kayıttan {{meta.from??0}} - {{meta.to??0}} kayıt görüntüleniyor.</span>
        <span v-else class="text-muted fst-italic">Kayıt yok</span>
    </div>
</template>
