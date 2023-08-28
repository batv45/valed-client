<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  timeAgo?: string
  img?: string
}>()
</script>

<template>
  <div class="toast" :class="{ show }" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" data-bs-toggle="toast">
    <div class="toast-header">
      <span v-if="img" class="avatar avatar-xs me-2" :style="`background-image: url(${img})`" />
      <strong v-if="title" class="me-auto" v-text="title" />
      <small v-if="timeAgo" v-text="timeAgo" />
      <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Kapat" />
    </div>
    <div class="toast-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
