<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { reactive } from 'vue'
import { IconCheck } from '@tabler/icons-vue'
import PageHeader from '~/components/layout/PageHeader.vue'
import AppLayout from '~/layouts/AppLayout.vue'
import Label from '~/components/form/Label.vue'
import FormInput from '~/components/form/input.vue'
import { useUserStore } from '~/stores/user.ts'
import Button from '~/components/form/Button.vue'
import useNotyf from '~/utils/useNotyf.ts'

useHead({
  title: 'Hesabım',
})

const userStore = useUserStore()
const form_profile = reactive({
  data: {
    first_name: userStore.getData().first_name,
    last_name: userStore.getData().last_name,
    email: userStore.getData().email,
  },
  errors: {},
  processing: false,
})

function submitProfile() {
  useNotyf.open({ type: 'warning', message: 'Bu özellik henüz aktif değil.' })
}
</script>

<template>
  <AppLayout>
    <template #page-header>
      <PageHeader title="Hesabım" sub-title="Hesap profil bilgileriniz" />
    </template>
    <div class="row mb-3">
      <div class="col">
        <form class="card" @submit.prevent="submitProfile">
          <div class="card-header">
            <h3 class="card-title">
              Profil bilgileriniz
            </h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-3 col-lg-2">
                <Label class="col-form-label" required>Ad Soyad</Label>
              </div>
              <div class="col-md-3">
                <FormInput v-model="form_profile.data.first_name" />
              </div>
              <div class="col-md-3">
                <FormInput v-model="form_profile.data.last_name" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-lg-2">
                <Label class="col-form-label" required>E-Posta</Label>
              </div>
              <div class="col-md-3">
                <FormInput v-model="form_profile.data.email" />
              </div>
            </div>
          </div>
          <div class=" text-end card-footer">
            <Button type="submit">
              <IconCheck />Kaydet
            </Button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<route lang="yaml">
meta:
  auth: true
</route>
