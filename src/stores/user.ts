import { acceptHMRUpdate, defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import moment from 'moment'
import useNotyf from '~/utils/useNotyf.ts'
import { useSwal } from '~/utils/useConfirm.ts'
import { useApiStore } from '~/stores/useApi.ts'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const api = useApiStore().authApi
  const localToken = useLocalStorage('valed_user_token', null)
  const localExpires = useLocalStorage('valed_user_expires', null)
  const localData = useLocalStorage('valed_user_data', null, {

    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  })

  function setUserData(_data: object) {
    localData.value = _data
  }
  function setApiToken(token: string) {
    api.headers.Authorization = `Bearer ${token}`
  }
  function getData() {
    return localData.value
  }
  function getToken() {
    return localToken.value
  }
  function getExpires() {
    return localExpires.value
  }
  function sessionTimeLeft() {
    if (localExpires.value) {
      const startDate = moment(localExpires.value)
      const current = moment()
      if (startDate.isValid() && moment.duration(startDate.diff(current)).asMinutes() >= 1)
        return moment.duration(startDate.diff(current)).asMinutes()
      else return null
    }
  }
  async function fetchUserData() {
    if (checkAuth()) {
      try {
        const ress = await api.request({
          method: 'GET',
          url: 'v1/me',
          type: 'users',
        })
        if (ress.data?.id)
          setUserData(ress.data)
      }
      catch (e) {
        setTimeout(() => window.location.href = '/auth/login', 5000)
        logout()
        useSwal('Upps.', 'Kullanıcı hesap bilgileri sunucu üzerinden alınamadı!', 'error', { timer: 4800 })
        useNotyf.error('Kullanıcı bilgileri alınamadı!')
      }
    }
  }
  function checkAuth(): boolean {
    const check = !!localToken.value
    if (check) {
      if (sessionTimeLeft() && sessionTimeLeft() <= 1)
        logout()

      setApiToken(localToken.value)
    }
    else { logout() }
    return check
  }
  api.interceptors.request.use((config) => {
    if (checkAuth())
      setApiToken(localToken.value)
    return config
  })
  async function login(email: string, password: string, redirect: boolean = false) {
    try {
      const result = await api.request({
        method: 'POST',
        url: 'auth/login',
        type: 'users',
        body: { email, password },
      })

      if (result && typeof result == 'object' && result.meta?.access_token) {
        localToken.value = result.meta?.access_token
        localExpires.value = result.meta?.expires_at
        setUserData(result.data)
      }
      console.log('LOGIN', result)
      if (redirect)
        router.go('/')
      return result
    }
    catch (e) {
      if (e.errors)
        return { errors: e.errors }
    }
  }
  function logout(redirect: bool = false) {
    localToken.value = null
    localData.value = null
    localExpires.value = null
    if (redirect)
      router.go('/')
  }

  return {
    getData,
    sessionTimeLeft,
    getExpires,
    setUserData,
    login,
    checkAuth,
    logout,
    fetchUserData,
    getToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
