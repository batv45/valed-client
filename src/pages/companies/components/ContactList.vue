<script setup lang="ts">
import { IconCheck, IconPlus } from '@tabler/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import RowEmpty from '~/components/RowEmpty.vue'
import Modal from '~/components/modal.vue'
import Input from '~/components/form/input.vue'
import Textarea from '~/components/form/Textarea.vue'
import Label from '~/components/form/Label.vue'
import Button from '~/components/form/Button.vue'

import { useApiStore } from '~/stores/useApi.ts'

defineProps({
  contacts: Object,
})
const router = useRouter()
const modalContactForm = ref()
const api = useApiStore()
const form_contact = reactive({
  data: {
    name: null,
    description: null,
  },
  errors: {},
  processing: false,
})
function showContact() {
  modalContactForm.value.show()
}
async function createContact() {
  try {
    const res = await api.jsonApi.create('contacts', form_contact.data)
    console.log('contact res: ', res)
  }
  catch (e) {
    form_contact.errors = e.errors
    console.log(e)
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        Cari Hesaplar
      </h3>

      <div class="card-actions">
        <a v-tooltip="'bottom'" href="#" title="Yeni cari hesap ekle" class="btn-action" @click.prevent="showContact"><IconPlus /></a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-vcenter table-nowrap card-table">
        <thead>
          <tr>
            <th>Hesap Adı</th>
            <th>Açıklama</th>
            <th>Bakiye</th>
            <th>Adres</th>
            <th class="w-1" />
          </tr>
        </thead>
        <tbody>
          <template v-if="contacts?.data?.length">
            <tr v-for="contact in contacts?.data">
              <td>
                {{ contact.name }}
              </td>
              <td>
                {{ contact.description }}
              </td>
              <td>
                {{ $filters.trl(contact.balance) }}
              </td>
              <td>
                {{ contact.address }}
              </td>
              <td>
                <router-link
                  :to="`/companies/${router.currentRoute.value.params.company}/contacts/${contact.id}`"
                >
                  Görüntüle
                </router-link>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5">
              <RowEmpty />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal ref="modalContactForm" title="Yeni cari hesap oluştur">
      <form @submit.prevent="createContact">
        <div class="mb-3">
          <Input v-model="form_contact.data.name" required label="Hesap adı" :error="form_contact.errors.name" />
        </div>
        <div class="mb-3">
          <Label value="Açıklama" />
          <Textarea v-model="form_contact.data.description" />
        </div>
      </form>
      <template #footer>
        <Button type="submit" @click.prevent="createContact">
          <IconCheck /> Kaydet
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>

</style>
