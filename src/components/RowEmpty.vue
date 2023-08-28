<script setup>
defineProps({
  emptyText: {
    type: String,
    default: 'Görüntülenecek kayıt yok.',
  },
})
</script>

<template>
  <div class="text-muted text-center fst-italic">
    {{ emptyText }} <slot />
  </div>
</template>
