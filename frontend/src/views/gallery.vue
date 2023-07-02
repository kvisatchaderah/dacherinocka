<script setup>
import { use_state_store } from '@stores'
import { image_carousel } from '@components'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const state_store = use_state_store()
const { images_list } = state_store
const { active_tag } = storeToRefs(state_store)

const active_images_list = computed(() => {
  if (!active_tag.value) return images_list

  return images_list.filter((images) => images.tag === active_tag.value)
})
console.log('images_list: ', images_list)

const carousel_images = images_list.map((image) => {
  image.imageUrl = image.images[0]
  image.info = { [image.tag]: image.name }
  return image
})
const current_carousel_image = ref(null)
const open_carousel = (i) => {
  current_carousel_image.value = i
}
const close_image_box = () => {
  current_carousel_image.value = null
}
</script>

<template>
  <div class="images">
    <template
      v-for="images_data in active_images_list"
      :key="images_data"
    >
      <div
        class="image_wrapper"
        v-for="(image, index) in images_data.images"
        @click="open_carousel(index)"
      >
        <img
          class="image"
          :src="image"
        />

        <div class="tag">
          <span>
            {{ images_data.name }}
          </span>
        </div>
      </div>
    </template>
  </div>

  <image_carousel
    :images="carousel_images"
    :index="current_carousel_image"
    bgcolor="rgba(51, 51, 51, .9)"
    @close="close_image_box"
  />
</template>

<style lang="sass" scoped>
.images
	display: flex
	flex-wrap: wrap
	justify-content: center
	gap: 20px


.image_wrapper
	width: calc(33% - 20px)
	height: 300px
	border-radius: 10px
	overflow: hidden
	position: relative
	cursor: pointer

.image
	height: 100%

.tag
	position: absolute
	bottom: 0
	left: 0
	right: 0
	height: 40px
	display: flex
	justify-content: flex-start
	align-items: center
	span
		position: relative
		z-index: 1
		color: #fff
		text-transform: uppercase
		padding-left: 10px
	&::after
		position: absolute
		z-index: 0
		content: ''

		top: 0
		bottom: 0
		left: 0
		right: 0

		background-color: #00000040
</style>
