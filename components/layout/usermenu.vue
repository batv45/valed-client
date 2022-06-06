<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="sr-only">Kullanıcı Menüsü</span>
        <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
      divide-y divide-gray-100 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="px-4 py -3">
          <p class="text-sm">Merhaba</p>
          <p class="text-sm font-medium text-gray-900 truncate">{{user.name}}</p>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
              Hesabım</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Ayarlar</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#" @click.prevent="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Oturumu Kapat</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  props:{
    user: Object
  },
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  },
  setup(){
    const logout = valedLogout
    return {
      logout
    }
  }
}
</script>
