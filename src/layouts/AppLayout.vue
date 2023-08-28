<script setup lang="ts">
import Header from '../components/layout/Header.vue'
import '@tabler/core/src/js/src/dropdown.js'
import { useUserStore } from '~/stores/user.ts'
import { useHead } from '@vueuse/head'

const props = defineProps<{
  title?: string
}>()
const userStore = useUserStore()
useHead({
  title: props.title ?? undefined,
})
</script>

<template>
  <div v-if="userStore.getData()" class="page">
    <!-- Navbar -->
    <Header />
    <div class="page-wrapper">
      <!-- Page header -->
      <slot name="page-header" />
      <!-- Page body -->
      <div class="page-body">
        <div class="container-xl">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
