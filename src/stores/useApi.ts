import { acceptHMRUpdate, defineStore } from 'pinia'
import Kitsu from 'kitsu'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { useUserStore } from '~/stores/user.ts'
import useNotyf from '~/utils/useNotyf.ts'

export const useApiStore = defineStore('api', () => {
  const endpoint = ref()
  const processing = ref(false)
  const authApi = new Kitsu({
    baseURL: import.meta.env.VITE_BASE_URL,
  })
  const jsonApi = new Kitsu({
    baseURL: `${import.meta.env.VITE_BASE_URL}/${(endpoint.value || import.meta.env.VITE_API_ENDPOINT)}`,
  })
  const errorHandler = (error: AxiosError) => {
    processing.value = false
    const userStore = useUserStore()
    if (error.errors) {
      error.form_errors = null
      error.errors.forEach((m) => {
        error.form_errors[m.source.pointer.replace('/data/attributes/', '')] = m.detail
      })
    }
    if (error.code === AxiosError.ERR_NETWORK) {
      userStore.logout()
      window.location.href = '/error/not-connection'
    }
    else if (error.code === AxiosError.ERR_BAD_REQUEST && error.response.status === 401) {
      userStore.logout()
      window.location.href = '/auth/login'
    }
    if (error.response.data?.errors[0].title)
      useNotyf.error(`Hata: ${error.response.data?.errors[0].detail}`)

    else
      useNotyf.error('Bir hata oluştu!')
  }
  const requestHandler = (request) => {
    const userStore = useUserStore()
    request.headers.Authorization = `Bearer ${userStore.getToken()}`
  }

  authApi.interceptors.request.use((request) => {
    processing.value = true
    requestHandler(request)
    return request
  })
  authApi.interceptors.response.use((response) => {
    return response
  }, (error) => {
    errorHandler(error)
    return Promise.reject(error)
  })
  jsonApi.interceptors.request.use((request) => {
    processing.value = true
    requestHandler(request)
    return request
  })

  jsonApi.interceptors.response.use((response) => {
    processing.value = false
    return response
  }, (error) => {
    errorHandler(error)
    return Promise.reject(error)
  })

  return {
    processing,
    endpoint,
    authApi,
    jsonApi,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiStore as any, import.meta.hot))
