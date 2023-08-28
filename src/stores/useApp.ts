import { acceptHMRUpdate, defineStore } from 'pinia'

export const uesAppStore = defineStore('app', () => {
  return {
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(uesAppStore as any, import.meta.hot))
