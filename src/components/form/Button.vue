<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="[`btn-${variant}`, { 'btn-loading': loading, 'disabled': loading || disabled }]"
  >
    <slot />
  </button>
</template>
