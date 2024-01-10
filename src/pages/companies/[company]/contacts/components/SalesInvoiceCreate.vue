<script setup lang="ts">
import { reactive } from 'vue'
import { IconCheck } from '@tabler/icons-vue'
import Input from '~/components/form/input.vue'
import Textarea from '~/components/form/Textarea.vue'
import Label from '~/components/form/Label.vue'
import Button from '~/components/form/Button.vue'
import { useApiStore } from '~/stores/useApi.ts'
import Errors from '~/components/form/Errors.vue'

const props = defineProps<{
  contact: object
}>()
const api = useApiStore()
const form_invoice = reactive({
  data: {
    title: null,
    description: null,
    issue_date: null,
    due_date: null,
    invoice_no: null,
  },
  errors: {},
})

async function submitCreate() {
  const res = await api.jsonApi.create('sales-invoices', form_invoice.data)
}
</script>

<template>
  <div>
    <Errors :errors="form_invoice.errors" />
    <div class="mb-3">
      <Input v-model="form_invoice.data.title" :error="form_invoice.errors.title" required label="Fatura başlığı" />
    </div>
    <div class="mb-3">
      <Input v-model="form_invoice.data.invoice_no" :error="form_invoice.errors.title" required label="Fatura Nu." />
    </div>
    <div class="mb-3">
      <Label value="Açıklama" />
      <Textarea v-model="form_invoice.data.description" />
    </div>

    <div class="text-end">
      <Button @click.prevent="submitCreate">
        <IconCheck /> Kaydet
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>
