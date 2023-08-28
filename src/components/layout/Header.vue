<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user.ts'
import UserInfo from '~/components/UserInfo.vue'
import NavBar from '~/components/layout/NavBar.vue'

const userStore = useUserStore()
const sessionTimeLeft = computed(() => {
  return userStore.sessionTimeLeft()?.toFixed(2)
})
function logout() {
  userStore.logout(true)
}
</script>

<template>
  <header class="navbar navbar-light navbar-expand-md d-print-none">
    <div class="container-xl">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a href="/">
          <img src="/static/logo.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
        </a>
      </h1>
      <div class="navbar-nav flex-row order-md-last">
        <div class="me-3 pt-2">
          {{ sessionTimeLeft }} Saniye kaldı
        </div>
        <div class="nav-item dropdown">
          <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
            <UserInfo v-if="userStore.getData()" :user="userStore.getData()" />
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <router-link to="/profile" class="dropdown-item">
              Hesabım
            </router-link>
            <div class="dropdown-divider" />

            <a href="#" class="dropdown-item">
              Ayarlar
            </a>

            <a href="#" class="dropdown-item" @click.prevent="logout">
              Oturumu Kapat
            </a>
          </div>
        </div>
      </div>
      <div id="navbar-menu" class="collapse navbar-collapse">
        <NavBar />
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
