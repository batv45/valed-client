<script setup lang="ts">
withDefaults(defineProps<{
  container?: string
}>(), {
  container: 'tight',
})
</script>

<template>
  <div class="page page-center">
    <div class="container py-4" :class="`container-${container}`">
      <slot />
    </div>
  </div>
</template>
