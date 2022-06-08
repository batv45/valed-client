<template>
  <div>

    <layout-page-header>Posts</layout-page-header>
    <div v-if="pending">Loading ...</div>
    <button type="button" @click.prevent="refresh">YENİLE</button>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="post in posts ">
        <div class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200
        shadow-md">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{post.title}}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{{post.content}}</p>
          <p class="mt-2 flex" v-if="post.author"><UserIcon class="mr-2"></UserIcon> {{post.author.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VdNotification from "~/components/vdNotification.vue";
import UserIcon from "vue-tabler-icons"

definePageMeta({
  layout:'authenticated'
})
const posts = ref([])
const { data, pending, error, refresh } = await valedUseFetchApi('posts')
posts.value = Deserializer(data.value)
// const meta = getApiMeta(posts)
//   console.log(posts.getData())
</script>

