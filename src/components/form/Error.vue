<script setup>
defineProps({
  error: String,
})
</script>

<template>
  <div v-if="error" class="invalid-feedback" :class="{ 'd-block ': error }">
    {{ error }}
  </div>
</template>
