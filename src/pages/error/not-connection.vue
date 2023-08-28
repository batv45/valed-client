<script setup lang="ts">
import { useHead } from '@vueuse/head'
import AuthLayout from '~/layouts/AuthLayout.vue'
import useNotyf from '~/utils/useNotyf.ts'

useHead({
  title: 'Error Connection',
})
useNotyf.error('Sunucu bağlantı hatası!')
</script>

<template>
  <AuthLayout container="narrow">
    <div class="empty">
      <div class="empty-header">
        Error Connection
      </div>
      <p class="empty-title">
        Upps.
      </p>
      <p class="empty-subtitle fs-3 text-secondary">
        Uzak sunucu bağlantı hatası oluştu. Oturum bilgileri temizlendi.
      </p>
      <div class="empty-action">
        <a href="/" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
          Ana sayfaya dön
        </a>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
