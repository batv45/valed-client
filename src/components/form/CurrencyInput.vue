<template>
    <FormInput ref="inputRef" v-model="formattedValue" placeholder="₺0,00">
        <template v-if="!!$slots['input-left']" #input-left>
            <slot name="input-left"></slot>
        </template>
        <template v-if="!!$slots['input-right']" #input-right>
            <slot name="input-right"></slot>
        </template>
    </FormInput>
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import FormInput from "@/views/components/form/input.vue"
import {watch} from "vue";

export default {
    name: "CurrencyInput",
    components: {FormInput},
    props: {
        modelValue: Number,
        options: Object,
        min:{
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
            currency:'TRY',
            valueRange: {
                "min": Number.parseInt(props.min)
            },
            hideGroupingSeparatorOnFocus:false,
            valueScaling:'precision',
            "precision": {
                "min": 2,
                "max": 4
            },
            ...props.options});

        watch(
            () => props.modelValue, // Vue 2: props.value
            (value) => {
                setValue(value)
            }
        )

        return { inputRef, formattedValue,numberValue };
    },
};
</script>
