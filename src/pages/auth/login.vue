<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { reactive } from 'vue'
import AuthLayout from '../../layouts/AuthLayout.vue'
import { useUserStore } from '../../stores/user.ts'

useHead({
  title: 'Giriş',
  bodyAttrs: { class: 'd-flex flex-column' },
})
const userStore = useUserStore()

const form_login = reactive({
  errors: null,
  email: 'asd@asd.com',
  password: '123123123',
})
async function submitLogin() {
  form_login.errors = null
  const result = await userStore.login(form_login.email, form_login.password, true)
  if (result.errors)
    form_login.errors = result.errors
}
</script>

<route lang="yaml">
meta:
  auth: false
</route>

<template>
  <AuthLayout>
    <div class="text-center mb-4">
      <a
        href=""
        class="navbar-brand navbar-brand-autodark"
      ><img
        src="/static/logo.svg"
        height="36"
        alt=""
      ></a>
    </div>
    <div class="card card-md">
      <div class="card-body">
        <h2 class="h2 text-center mb-4">
          Giriş yap
        </h2>
        <div v-if="form_login.errors" class="alert alert-danger">
          <p><strong>Opps. - Bir hata oluştu!</strong></p>
          <p v-for="err in form_login.errors">
            {{ err.detail }}
          </p>
        </div>
        <form autocomplete="off" novalidate @submit.prevent="submitLogin">
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input v-model="form_login.email" type="email" class="form-control" placeholder="E-Posta adresiniz" autocomplete="off">
          </div>
          <div class="mb-2">
            <label class="form-label">
              Password
            </label>
            <div class="input-group input-group-flat">
              <input v-model="form_login.password" type="password" class="form-control" placeholder="Your password" autocomplete="off">
              <span class="input-group-text">
                <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                </a>
              </span>
            </div>
          </div>
          <div class="form-footer">
            <button
              type="submit"
              class="btn btn-primary w-100"
            >
              Oturum aç
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="text-center text-muted mt-3">
      Hesabın yok mu? <router-link
        to="/auth/register"
        tabindex="-1"
      >
        Kayıt ol
      </router-link>
    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
