<script setup lang="ts">
import { useHead } from '@vueuse/head'
import AuthLayout from '../../layouts/AuthLayout.vue'

useHead({
  title: 'Giriş',
  bodyAttrs: { class: 'd-flex flex-column' },
})
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
          Kayıt ol
        </h2>
        <form
          action="./"
          method="get"
          autocomplete="off"
          novalidate
        >
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              value="asd@asd.com"
              class="form-control"
              placeholder="E-Mail address"
              autocomplete="off"
            >
          </div>
          <div class="mb-2">
            <label class="form-label">
              Password
            </label>
            <div class="input-group input-group-flat">
              <input
                type="password"
                value="123123123"
                class="form-control"
                placeholder="Your password"
                autocomplete="off"
              >
              <span class="input-group-text">
                <a
                  href="#"
                  class="link-secondary"
                  title="Show password"
                  data-bs-toggle="tooltip"
                >
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
          <div class="mb-2">
            <label class="form-label">
              Password Repeat
            </label>
            <div class="input-group input-group-flat">
              <input
                type="password"
                value="123123123"
                class="form-control"
                placeholder="Your password"
                autocomplete="off"
              >
              <span class="input-group-text">
                <a
                  href="#"
                  class="link-secondary"
                  title="Show password"
                  data-bs-toggle="tooltip"
                >
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
              Kayıt ol
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="text-center text-muted mt-3">
      Zaten hesabın var mı? <router-link
        to="/auth/login"
        tabindex="-1"
      >
        Oturum aç
      </router-link>
    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
