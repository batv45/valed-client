<template>
    <div class="md:flex md:items-center md:justify-between py-5">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
          <slot />
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <slot name="actions">

        </slot>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
