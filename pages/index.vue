<template>
  <div>
    <layout-page-header>Ana Sayfa</layout-page-header>
    <div class="max-w-sm mx-auto mt-4">
      <div class="flex items-center">
        <img
            class="w-40 h-40 rounded-full mb-4"
            height="160"
            width="160"
            src="https://avatars.githubusercontent.com/u/38668796?v=4"
            alt="productfrontenddeveloper"
        />
        <a
            target="blank"
            class=" ml-4 text-yellow-400 dark:text-green-400 font-bold"
            href="https://github.com/productdevbook"
        >Follow Me Github</a
        >
      </div>
      <ul role="list" class="mt-10 space-y-4">
        <li v-for="item in lists" :key="item.id">
          <List
              :link="{
            id: item.id,
            title: item.title,
            url: item.url,
          }"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { NuxtLink } from "#components";
import { link } from "~/types";

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth'
})

export default {
  middleware({ store, redirect }) {
    console.log('auth middle')
  },
  components: {
    NuxtLink,
  },
  async setup() {
    const user = await useValedUser()
    const lists = ref<link[]>([
      { id: 1, title: "Pinia Store", url: "pinia" },
      { id: 1, title: "Modal", url: "modal" },
      { id: 1, title: "Menu", url: "menu" },
      { id: 1, title: "New soon...", url: "" },
    ]);
    return {
      user,
      lists,
    };
  },
};
</script>
