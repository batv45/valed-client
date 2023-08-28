<script setup>
import {IconTrash}  from "@tabler/icons-vue";
import {computed, onMounted, ref, useAttrs} from "vue";
import {toLower} from "lodash";
import FormInput from "@/views/components/form/input.vue";
import Button from "@/views/components/form/button.vue";

const emit = defineEmits(['onConfirmed'])

const props = defineProps({
    text: {
        type: String,
        default:''
    },
    processing: {
        type: Boolean,
        default: false
    }
})

const userAnswer = ref()
const verified = computed(() => props.text ? toLower(userAnswer.value) === toLower(props.text) : true)

const reset = () => {
    userAnswer.value = null
}

defineExpose({reset})
</script>

<template>
    <form @submit.prevent="verified ? $emit('onConfirmed') : false">
        <div v-if="text" class="mb-3 ">
            <p>Silme işlemini onaylamak için metni aşağıdaki kutuya yazınız.<br/>
                <span class=" strong h3 ">
                        <span class="user-select-none">" </span>
                        <span class="user-select-all text-danger" v-text="toLower(text)"></span>
                        <span class="user-select-none"> "</span>
                    </span> </p>
            <FormInput v-model="userAnswer"
                       @focus="e => e.target.select()" placeholder="İşlemi doğrula"></FormInput>
        </div>
        <div v-else class="mb-3">
            <p>Bu kaydı silmek istediğinize emin misiniz ?</p>
        </div>
        <Button type="submit" :disabled="!verified" :loading="processing" variant="danger"><IconTrash/> Silmeyi onayla</Button>
    </form>
</template>
