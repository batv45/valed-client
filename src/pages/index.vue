<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { IconCheck, IconPlus } from '@tabler/icons-vue'
import { useHead } from '@vueuse/head'
import AppLayout from '../layouts/AppLayout.vue'
import PageHeader from '~/components/layout/PageHeader.vue'
import RowEmpty from '~/components/RowEmpty.vue'
import Modal from '~/components/modal.vue'
import Input from '~/components/form/input.vue'
import Textarea from '~/components/form/Textarea.vue'
import Label from '~/components/form/Label.vue'
import Button from '~/components/form/Button.vue'
import router from '~/router.ts'
import useNotyf from '~/utils/useNotyf.ts'
import Errors from '~/components/form/Errors.vue'
import { useApiStore } from '~/stores/useApi.ts'

const apiStore = useApiStore()
const companies = ref()
const modalCompanyForm = ref()
const form_company = reactive({
  data: {
    name: null,
    address: null,
  },
  errors: {},
  processing: false,
})

useHead({
  title: 'Ana Sayfa',
})

onMounted(async () => {
  companies.value = await apiStore.jsonApi.get('companies')
})
function showCompanyForm(title: string) {
  modalCompanyForm.value.show(typeof title === 'string' ? title : undefined)
}
async function submitCompanyCreate() {
  apiStore.jsonApi.post('companies', form_company.data).then((r) => {
    useNotyf.success('Yeni firma oluşturuldu.')
    router.push(`/companies/${r.data.id}`)
    console.log(r)
  }).catch((err) => {
    err.errors.map((m) => {
      form_company.errors[m.source.pointer.replace('/data/attributes/', '')] = m.detail
    })
  })
}
</script>

<template>
  <AppLayout>
    <template #page-header>
      <PageHeader title="Ana Sayfa" sub-title="Kayıtlı firmalarınızda işlem yapmak için seçim yapınız." />
    </template>

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              Firmalarınız
            </h3>
            <div class="card-actions">
              <a v-tooltip="'bottom'" title="Yeni firma ekle" href="#" class="btn-action" @click.prevent="showCompanyForm('Yeni firma ekle')"><IconPlus /></a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-vcenter table-nowrap card-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th class="w-1" />
                </tr>
              </thead>
              <tbody>
                <template v-if="companies?.data">
                  <tr v-for="(company, index) in companies.data" :key="`company-${index}`">
                    <td>
                      {{ company.name }}
                    </td>
                    <td>
                      {{ company.address }}
                    </td>
                    <td>
                      <router-link :to="`/companies/${company.id}`">
                        Seçim
                      </router-link>
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="3">
                    <RowEmpty />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Modal ref="modalCompanyForm">
      <Errors :errors="form_company.errors" />
      <form @submit.prevent="submitCompanyCreate">
        <div class="mb-3">
          <Input v-model="form_company.data.name" :error="form_company.errors.name" required label="Firma adı" />
        </div>
        <div class="mb-3">
          <Label value="Adres" />
          <Textarea v-model="form_company.data.address" />
        </div>
      </form>
      <template #footer>
        <Button @click.prevent="submitCompanyCreate">
          <IconCheck /> Kaydet
        </Button>
      </template>
    </Modal>
  </AppLayout>
</template>

<route lang="yaml">
meta:
  auth: true
</route>

<style scoped>

</style>
