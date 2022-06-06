<template>
  <div>
    <layout-page-header>Posts</layout-page-header>
    <div class="grid grid-cols-4 gap-4">
      <div v-if="!!posts" v-for="post in posts.getData()">
        <div class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200
        shadow-md">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{post.getAttribute('title')}}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{{post.getAttribute('content')}}</p>
          <p class="mt-2 flex"><UserIcon class="mr-2"></UserIcon> {{post.getAuthor().getAttribute('name')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserIcon} from "vue-tabler-icons";

definePageMeta({
  layout:'authenticated'
})
const posts = await Post.get()
const meta = getApiMeta(posts)
  console.log(posts.getData())
</script>
