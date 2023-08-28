<script setup lang="ts">
import Avatar from '~/components/Avatar.vue'

defineProps({
  user: {
    type: Object,
    required: true,
  },
  avatarSize: {
    type: Number,
  },
  onlyAvatar: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="d-flex py-1 align-items-center">
    <Avatar inline :size="avatarSize" :src="user.profile_photo_url" :name="user.full_name" />
    <div v-show="!onlyAvatar" class="flex-fill lh-sm ms-2">
      <div class="font-weight-medium">
        {{ user?.full_name }}
      </div>
      <div class="text-muted">
        {{ user?.email }}
      </div>
    </div>
  </div>
</template>
