<script setup>
import { onMounted, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import Label from '~/components/form/Label.vue'
import Error from '~/components/form/Error.vue'

defineOptions({
  name: 'FormInput',
  inheritAttrs: false,
})
const props = defineProps({
  modelValue: [Number, String, Array],
  label: {
    type: String,
  },
  error: String,
  placeholder: String,
  autocomplete: {
    type: String,
    default: 'off',
  },
  hint: String,
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default() {
      return `text-input-${uuid()}`
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  noFlat: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['update:modelValue'])
const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus'))
    input.value.focus()
})
</script>

<template>
  <div>
    <Label v-if="!!$slots.label || label" :required="required" :for="id">
      <slot name="label">
        {{ label ?? '' }}
      </slot>
    </Label>
    <div class="input-group" :class="{ 'input-group-flat': !noFlat, 'form-control-flush': ($attrs.class?.search('form-control-flush') >= 0 || $attrs.class?.search('border-0') >= 0) }">
      <span v-if="!!$slots['input-left']" class="input-group-text " :class="{ 'border-danger': error, 'border-0': ($attrs.class?.search('form-control-flush') >= 0 || $attrs.class?.search('border-0') >= 0) }">
        <slot name="input-left" />
      </span>
      <input
        :id="id"
        ref="input"
        v-bind="$attrs"
        class="form-control"
        :class="{ 'is-invalid': error, 'roundeda': (!$slots['input-right'] || !$slots['input-left']), 'border-0': $attrs.class?.search('form-control-flush') >= 0 }"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :type="type"
        :required="required"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <span
        v-if="!!$slots['input-right']"
        class="input-group-text p-0 "
        :class="{ 'border-danger': error, 'pe-2': $slots['input-right'], 'ps-2': noFlat, 'border-0': ($attrs.class?.search('form-control-flush') >= 0 || $attrs.class?.search('border-0') >= 0) }"
      >
        <slot name="input-right" />
      </span>
    </div>
    <small v-if="hint" class="form-hint" v-html="hint" />
    <Error :error="error" />
  </div>
</template>
