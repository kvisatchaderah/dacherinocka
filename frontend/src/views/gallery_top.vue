<script setup>
import { use_state_store } from '@stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const state_store = use_state_store()
const { images_list, choise_tag } = state_store
const { active_tag } = storeToRefs(state_store)

const tags = computed(() => {
  const tags_map = new Set()

  images_list.forEach((images_data) => {
    tags_map.add(images_data.tag)
  })

  return [...tags_map]
})
</script>

<template>
  <div class="hashtags">
    <div
      v-for="tag in tags"
      :key="tag"
      :class="[
        'hashtag',
        {
          '--active': active_tag === tag,
        },
      ]"
      @click="choise_tag(tag)"
    >
      #{{ tag }}
    </div>

    <div
      :class="['hashtag']"
      @click="choise_tag(null)"
    >
      отменить
    </div>
  </div>
</template>

<style lang="sass" scoped>
.hashtags
	display: flex
	gap: 20px
	justify-content: center
	flex-wrap: wrap

.hashtag
	color: #6c757d
	cursor: pointer
	&.--active
		color: #007bff
</style>
