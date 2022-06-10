<script lang="ts">
export default {
  async setup(){
    const user = await useValedUser()
    const logout = valedLogout

    return {
      user,
      logout
    }
  }
}
</script>

<template>
  <div>
    <layout-navbar :user="user"></layout-navbar>
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
      <slot/>
    </div>
  </div>
</template>
