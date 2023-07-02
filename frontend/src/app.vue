<script setup>
import * as views_components from '@views'

import { use_state_store } from '@stores'
import { storeToRefs } from 'pinia'

const state_store = use_state_store()
const { views, open_view } = state_store
const { active_view } = storeToRefs(state_store)
</script>

<template>
  <div class="top">
    <div class="container">
      <div class="nav">
        <div
          v-for="view in views"
          :key="view.component"
          :class="[
            'link',
            {
              '--active': view.component === active_view,
            },
          ]"
          @click="open_view(view.component)"
        >
          {{ view.name }}
        </div>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="container">
      <!-- view top -->
      <component :is="views_components[`${active_view}_top`]" />
      <!-- /view top -->
    </div>
    <div class="container">
      <div class="card">
        <div class="wrapper">
          <!-- view -->
          <component :is="views_components[active_view]" />
          <!-- /view -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
body
	margin: 0
	background-color: #f5f5f5
	font-size: 18px
</style>

<style lang="sass" scoped>
.top
	position: fixed
	z-index: 1

	top: 0
	left: 0
	right: 0
	height: 60px

	display: flex
	align-items: center
	justify-content: flex-start
	flex-wrap: wrap
	background-color: #563d7c
	box-shadow: 2px 2px 2px #00000020

.content
	margin-top: 60px

	display: flex
	flex-direction: column
	justify-content: space-around
	gap: 20px

	padding-top: 20px
	padding-bottom: 20px

.container
	margin-left: auto
	margin-right: auto
	padding-left: 20px
	padding-right: 20px

	max-width: 1200px
	width: calc(100% - 40px)

.wrapper
	overflow: hidden

.card
	padding: 20px

	border-radius: 10px
	border: 1px solid #ccc
	box-shadow: 2px 2px 2px #00000020
	background-color: #fff

.nav
	display: flex
	gap: 20px
	justify-content: center
	flex-wrap: wrap

.link
	font-size: 24px
	font-weight: bold
	cursor: pointer
	color: #cbbde2
	&:hover,
	&.--active
		color: #fff

.fade-enter-active
.fade-leave-active
	transition: opacity 180ms ease-in-out

.fade-enter,
.fade-leave-to
	opacity: 0
</style>
