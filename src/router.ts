import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user.ts'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const isLogged = userStore.checkAuth()

  if (isLogged && !userStore.getData())
    await userStore.fetchUserData()

  if ((to.meta.auth === true && !isLogged) && to.name !== 'auth-login')
    return { name: 'auth-login' }

  else if (to.meta.auth === false && isLogged && (to.name !== 'index'))
    return { name: 'index' }
  {
    return true
  }
})
router.afterEach((to, from) => {
  if (document.getElementsByClassName('modal-backdrop').length)
    document.getElementsByClassName('modal-backdrop')[0]?.remove()
})

export default router
