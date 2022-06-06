<script lang="ts">

import {LockClosedIcon} from "@heroicons/vue/solid";
import {LoaderIcon} from "vue-tabler-icons";
import VdButton from "~/components/vdButton.vue";

definePageMeta({
  layout: 'authentication',
  middleware: 'guest'
})
export default {
  components:{
    VdButton,
    LockClosedIcon,
    LoaderIcon
  },
  setup(){
    const login = valedLogin
    const process = ref('')
    const email = ref('asd@asd.com')
    const pass = ref('123')
    function submitLogin(){
      process.value = 'login'
      valedLogin(email.value,pass.value)
    }

    return {
      login,process,email,pass,submitLogin
    }
  }
}

</script>

<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md  w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-light text-gray-700">Kullanıcı Girişi</h2>
      </div>
      <div class="p-4 pt-2 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" @submit.prevent="submitLogin">
        <div class="rounded-md shadow-sm flex flex-col space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">E-Posta</label>
            <div class="mt-1">
              <input type="email" v-model="email" name="email" id="email" class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="E-Posta adresiniz" aria-describedby="email-description" />
            </div>
          </div>
          <div class="">
            <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
            <div class="mt-1">
              <input type="password" v-model="pass" name="password" id="password"
                     class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     placeholder="Şifreniz" aria-describedby="password-description" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Beni hatırla </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-gray-600 hover:text-gray-500"> Şifremi unuttum </a>
          </div>
        </div>

        <div>
          <vd-button type="submit" :loading="process == 'login'" class="w-full ">
            <template #icon>
              <LockClosedIcon class="h-5 w-5 text-gray-100 group-hover:text-gray-400" aria-hidden="true" />
            </template>
            Oturum Aç</vd-button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-top{

}
</style>
