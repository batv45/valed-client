<script setup lang="ts">
import RowEmpty from '~/components/RowEmpty.vue'

const props = defineProps<{
  invoice: object
}>()
</script>

<template>
  <div v-if="invoice">
    <div>
      <h4>
        <span class="fw-normal">Tarih: </span>{{ $filters.dateTime(invoice.data.issue_date) }} -
        <span class="fw-normal">Vade tarihi: </span>{{ $filters.dateTime(invoice.data.due_date) }}
      </h4>
      <h4>
        <span class="fw-normal">Başlık: #{{ invoice.data.id }} - </span>{{ invoice.data.title }} -
        <span class="fw-normal">Fatura Nu.: </span>{{ invoice.data.invoice_no }}
      </h4>
      <h4><span class="fw-normal">Fatura tutarı:</span> {{ $filters.trl(invoice.data.total_price) }}</h4>
    </div>
    <div class="card">
      <div class="table-responsive">
        <table class="table table-vcenter table-nowrap card-table">
          <thead>
            <tr>
              <th>Açıklama</th>
              <th class="w-1">
                Birim
              </th>
              <th class="w-1">
                Birim fiyatı
              </th>
              <th class="w-1">
                Net satır fiyatı
              </th>
              <th class="w-1">
                KDV
              </th>
              <th class="w-1">
                Toplam satır fiyatı
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="invoice.data.details?.data?.length">
              <tr v-for="detail in invoice.data.details?.data">
                <td>
                  {{ detail.name }}
                  <p class="small fst-italic m-0">
                    {{ detail.description }}
                  </p>
                </td>
                <td>
                  {{ detail.quantity }} <span class="small">{{ detail.unit_type }}</span>
                </td>
                <td>{{ $filters.trl(detail.unit_price) }}</td>
                <td>{{ $filters.trl(detail.net_price) }}</td>
                <td>{{ detail.vat_rate }}%</td>
                <td>{{ $filters.trl(detail.total_price) }}</td>
              </tr>
              <tr class="table-light">
                <td colspan="5">
                  Toplam
                </td>
                <td>
                  {{ $filters.trl(invoice.data.total_price) }}
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6">
                <RowEmpty />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
