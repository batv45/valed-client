<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IconTrash } from '@tabler/icons-vue'
import AppLayout from '~/layouts/AppLayout.vue'
import PageHeader from '~/components/layout/PageHeader.vue'
import router from '~/router.ts'
import ContactList from '~/pages/companies/components/ContactList.vue'
import AccountList from '~/pages/companies/components/AccountList.vue'
import { useConfirm, useSwal } from '~/utils/useConfirm.ts'
import useNotyf from '~/utils/useNotyf.ts'
import { useApiStore } from '~/stores/useApi.ts'

const company = ref()
const useApi = useApiStore()
onMounted(async () => {
  try {
    company.value = await useApi.jsonApi.get(`companies/${router.currentRoute.value.params.company}`, { params: { include: 'contacts,accounts' } })
  }
  catch (e) {
    if (e.response.status === 404)
      router.push('/').then(() => useNotyf.error('Firma bilgisi bulunamadı!'))
  }
})
function deleteCompany() {
  useConfirm('Bu firma bilgisini silmek istediğinize emin misiniz?').then(async (r) => {
    if (r.isConfirmed) {
      try {
        await useApi.jsonApi.delete('companies', router.currentRoute.value.params.company)
        router.push('/').then(() => useNotyf.success('Firma bilgisi başarıyla silindi.'))
      }
      catch (e) {
        useSwal('Firma bilgisi silinemedi!', `${e.message}`, 'error')
      }
    }
  })
}
</script>

<template>
  <AppLayout>
    <template #page-header>
      <PageHeader title="Firmanız" back-href="/" :sub-title="company?.data.id ? (`#${company?.data.id || ''} - ${company?.data.name || ''} - ${company?.data.address ?? ''}`) : '#'">
        <template #actions>
          <div class="dropdown">
            <button type="button" class="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
              Seçenekler
            </button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item text-danger" @click.prevent="deleteCompany"><IconTrash class="dropdown-item-icon text-danger" /> Firmayı Sil</a>
            </div>
          </div>
        </template>
      </PageHeader>
    </template>

    <div class="row">
      <div class="col-md-6">
        <ContactList :contacts="company?.data.contacts" />
      </div>
      <div class="col-md-6">
        <AccountList :accounts="company?.data.accounts" />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>

</style>
