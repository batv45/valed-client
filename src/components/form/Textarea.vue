<script setup lang="ts">
defineProps({
  modelValue: [Number, String, Array],
})

defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    v-autosize

    rows="3"
    :value="modelValue"
    class="form-control"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
