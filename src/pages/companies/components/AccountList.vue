<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue'
import RowEmpty from '~/components/RowEmpty.vue'

defineProps({
  accounts: Object,
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        Kasa Hesapları
      </h3>
      <div class="card-actions">
        <a v-tooltip="'bottom'" href="#" title="Yeni kasa ekle" class="btn-action"><IconPlus /></a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-vcenter table-nowrap card-table">
        <thead>
          <tr>
            <th>Kasa Adı</th>
            <th>Açıklama</th>
            <th>Bakiye</th>
            <th class="w-1" />
          </tr>
        </thead>
        <tbody>
          <template v-if="accounts?.data?.length">
            <tr v-for="(account, index) in accounts?.data" :key="`account-${index}`">
              <td>
                {{ account.name }}
              </td>
              <td>
                {{ account.description }}
              </td>
              <td>
                {{ $filters.trl(account.balance) }}
              </td>
              <td>
                <a href="#">Görüntüle</a>
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
</template>

<style scoped>

</style>
