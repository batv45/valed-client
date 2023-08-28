<template>
    <div>
        <ul v-if="links.length > 3" class="pagination m-0 ml-auto">
            <li v-for="(link, key) in links" class="page-item"
                :class="{'active': link.active,'disabled':link.url === null}">
                <div v-if="link.url === null" class="page-link"
                     v-html="link.label">
                </div>
                <Link v-else preserve-scroll @click="$emit('onChanged',link)" class="page-link" :href="link.url"
                      v-html="link.label">
                </Link>
            </li>
        </ul>
    </div>
</template>

<script setup>
const emits = defineEmits(['onChanged'])
defineProps({
    links: Array
})
</script>
