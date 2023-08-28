<script setup>
import { v4 as uuid } from 'uuid'
import {onMounted, ref, watch} from "vue";
import {Offcanvas} from "bootstrap";
import {useEventListener} from "@vueuse/core";

const props = defineProps({
    title: String,
    variant: {
        type: String,
        default: 'end' //start-top-end-bottom
    },
    id: {
        type: String
    },
    show:Boolean
})

const emit = defineEmits(['onHidden','onShown']);
const offCanvasElement = ref()
const offCanvasObj = ref(null);

onMounted(() => {
    if(!props.id){
        offCanvasObj.value = new Offcanvas(offCanvasElement.value);

        useEventListener(offCanvasElement.value,'hidden.bs.modal', event => {
            emit('onHidden', event)
        })

        useEventListener(offCanvasElement.value,'shown.bs.modal', event => {
            emit('onShown', event)
        })
        if( props.show ) {
            show()
        }
    }
});

watch(() => props.show, s => s ? show() : hide())
function show() {
    offCanvasObj.value.show();
}
function hide() {
    offCanvasObj.value.hide();
}
defineExpose({ show, hide});
</script>

<template>
    <div>
        <div class="offcanvas" :class="'offcanvas-'+variant" ref="offCanvasElement" tabindex="-1" :id="id"
             :aria-labelledby="id+'-label'">
            <div class="offcanvas-header">
                <h2 v-if="title" class="offcanvas-title" :id="id+'-label'">
                    {{ title }}
                </h2>
                <slot v-else name="header">
                </slot>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Kapat"></button>
            </div>
            <div class="offcanvas-body">
                <slot/>
            </div>
        </div>
    </div>
</template>
