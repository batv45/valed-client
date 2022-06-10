<template>
  <div :class="$attrs.class ? $attrs.class : 'mb-3'">
    <label v-if="label" class="block text-sm font-medium text-gray-700" :class="{'required': required}" :for="id">{{ label }}</label>
    <div class="mt-1">
      <input :id="id" ref="input"
              v-bind="{ ...$attrs, class: null }"
              class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
              :class="{
                    'is-invalid': error,
                   'form-number': type === 'number' ,
                   'form-control-sm': sm
                }"
             :placeholder="placeholder"
              :type="type"
              :required="required"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"/>
      <div v-if="error" class="invalid-feedback">{{ error }}</div>
        <small v-if="hint" class="form-hint">
          <span v-html="hint"></span>
        </small>
      </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid'
import {defineEmits} from "@vue/runtime-core";

defineEmits(['update:modelValue'])

export default {
  inheritAttrs: false,
  props: {
    required:{
      type: Boolean,
      default: false
    },
    sm:{
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default() {
        return `text-input-${uuid()}`
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    error: String,
    label: String,
    placeholder: String,
    hint: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end)
    },
  },
}
</script>
