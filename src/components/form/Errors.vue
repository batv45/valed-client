<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
defineProps({
  errors: Object,
})
</script>

<template>
  <div v-if="errors && Object.values(errors)?.length">
    <div class="bg-danger-lt p-2">
      <div class="border-bottom border-danger-subtle pb-1 mb-1">
        <strong>Upps!</strong> Hatalar mevcut.
      </div>
      <div v-for="(error, index) in errors" :key="`err-${index}`">
        <span>*</span> {{ error }}
      </div>
    </div>
  </div>
</template>
