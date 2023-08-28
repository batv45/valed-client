<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { Modal } from 'bootstrap'
import { IconX } from '@tabler/icons-vue'

const props = defineProps({
  id: {
    type: String,
    default() {
      return `modal-${uuid()}`
    },
  },
  xl: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: '<<Title goes here>>',
  },
  options: {
    type: Object,
  },
})

const emit = defineEmits(['onHidden', 'onShown'])
const modalEle = ref(null)
let thisModalObj = null
const _size = computed(() => `modal-${props.size}`)
const _tempTitle = ref()

onMounted(() => {
  thisModalObj = new Modal(modalEle.value, {
    focus: false,
    ...props.options,
  })
  modalEle.value?.addEventListener('hidden.bs.modal', (event) => {
    emit('onHidden', event)
  })
  modalEle.value?.addEventListener('shown.bs.modal', (event) => {
    emit('onShown', event)
  })
})

function _show(title: string) {
  _tempTitle.value = title
  thisModalObj.show()
}
function _hide() {
  thisModalObj.hide()
}
function _setTitle(title: string) {
  _tempTitle.value = title
}
defineExpose({ show: _show, hide: _hide, setTitle: _setTitle, modalObj: thisModalObj })
</script>

<template>
  <div :id="id" ref="modalEle" class="modal fade" :class="{ 'modal-xl ': xl }" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " :class="[_size, { 'modal-fullscreen ': fullScreen }]" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ _tempTitle ? _tempTitle : title }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat" />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="!hideFooter" class="modal-footer">
          <slot name="footer" />
          <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal">
            <IconX /> Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
