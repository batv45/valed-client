<script setup lang="ts">
defineProps({
  title: String,
  subTitle: String,
  backHref: String,
  backText: {
    type: String,
    default: 'Geri Dön',
  },
})
</script>

<template>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <slot>
            <slot name="breadcrumb" />
            <div class="page-title">
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <span class="page-subtitle">
              <slot name="subtitle">{{ subTitle }}</slot>
            </span>
          </slot>
        </div>

        <div class="col-auto col-md-auto ms-auto d-print-none align-self-baseline">
          <div class="btn-list">
            <slot name="actions" />

            <router-link v-if="backHref" :to="backHref" class="btn btn-dark d-none d-sm-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
              {{ backText }}
            </router-link>
            <router-link v-if="backHref" :to="backHref" class="btn btn-dark d-sm-none btn-icon" aria-label="Geri dön">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
