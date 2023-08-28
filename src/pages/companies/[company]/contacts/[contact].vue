<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { IconPlus } from '@tabler/icons-vue'
import AppLayout from '~/layouts/AppLayout.vue'
import PageHeader from '~/components/layout/PageHeader.vue'
import { useApiStore } from '~/stores/useApi.ts'
import Modal from '~/components/modal.vue'
import RowEmpty from '~/components/RowEmpty.vue'
import SalesInvoiceDetails from '~/pages/companies/[company]/contacts/components/SalesInvoiceDetails.vue'
import SalesInvoiceCreate from '~/pages/companies/[company]/contacts/components/SalesInvoiceCreate.vue'

const router = useRouter()
const contact = ref()
const api = useApiStore()
const modalSalesInvoiceDetails = ref()
const modalSalesInvoiceCreate = ref()
const selectSaleInvoice = ref()

onMounted(async () => {
  contact.value = await api.jsonApi.get(`contacts/${router.currentRoute.value.params.contact}`, { params: { include: 'company,sales_invoices,purchase_invoices' } })
})

async function showSalesInvoiceDetails(invoice) {
  selectSaleInvoice.value = await api.jsonApi.get(`sales-invoices/${invoice.id}`, { params: { include: 'details' } })
  modalSalesInvoiceDetails.value.show()
}
function showSalesInvoiceCreate() {
  modalSalesInvoiceCreate.value.show()
}
</script>

<template>
  <AppLayout title="Cari hesap">
    <template #page-header>
      <PageHeader title="Cari hesap" :sub-title="`#${contact?.data.id} - ${contact?.data.name}`" :back-href="`/companies/${contact?.data.company.data.id}`" />
    </template>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              Satış faturaları
            </h3>
            <div class="card-actions">
              <a v-tooltip="'bottom'" href="#" title="Yeni satış faturasu ekle" class="btn-action" @click.prevent="showSalesInvoiceCreate"><IconPlus /></a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-vcenter table-nowrap card-table">
              <thead>
                <tr>
                  <th class="w-1">
                    Tarih
                  </th>
                  <th>Başlık</th>
                  <th>Fatura Nu.</th>
                  <th>Tutar</th>
                  <th class="w-1" />
                </tr>
              </thead>
              <tbody>
                <template v-if="contact?.data?.sales_invoices?.data">
                  <tr v-for="(sale, index) in contact?.data?.sales_invoices?.data" :key="index">
                    <td>
                      {{ $filters.dateTime(sale.issue_date) }}
                    </td>
                    <td>
                      <a v-tooltip href="#" title="Detay görüntüle" @click.prevent="showSalesInvoiceDetails(sale)">#{{ sale.id }}
                        - {{ sale.title }}</a>
                    </td>
                    <td>
                      {{ sale.invoice_no }}
                    </td>
                    <td>
                      {{ $filters.trl(sale.total_price) }}
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
        </div>
      </div>
    </div>
    <Modal ref="modalSalesInvoiceDetails" :options="{ backdrop: 'static', keyboard: true }" xl title="Satış fatura detayları">
      <SalesInvoiceDetails v-if="selectSaleInvoice" :invoice="selectSaleInvoice" />
    </Modal>
    <Modal ref="modalSalesInvoiceCreate" hide-footer title="Yeni satış faturası oluştur">
      <SalesInvoiceCreate v-if="contact" :contact="contact" />
    </Modal>
  </AppLayout>
</template>

<style scoped>

</style>
