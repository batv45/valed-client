<script setup lang="ts">
import { IconHome2, IconUser } from '@tabler/icons-vue'
</script>

<template>
  <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <span class="nav-link-icon d-md-none d-lg-inline-block">
            <IconHome2 class="icon" />
          </span>
          <span class="nav-link-title">
            Ana Sayfa
          </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile">
          <span class="nav-link-icon d-md-none d-lg-inline-block">
            <IconUser class="icon" />
          </span>
          <span class="nav-link-title">
            Hesabım
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
