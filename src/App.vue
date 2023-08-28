<script setup lang="ts">
import { computed } from 'vue'
import { useApiStore } from '~/stores/useApi.ts'

const api = useApiStore()

const showLoading = computed(() => {
  return api.processing
})
</script>

<template>
  <router-view />

  <div class="toast w-auto bg-blue position-fixed" :class="{ show: showLoading }" style="left:1.5rem;bottom:1.5rem" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" data-bs-toggle="toast">
    <div class="toast-body text-white">
      <div class="spinner-border text-white" role="status" />
    </div>
  </div>
</template>
