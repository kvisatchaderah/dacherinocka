<template>
  <transition name="image-box">
    <div
      v-if="imageIndex !== null"
      class="imgBox"
      :style="imgBox_style"
      @click="close"
    >
      <button
        type="button"
        class="imgBox__info"
        @click.stop="toggle_info"
      >
        <FeatherIcon
          icon="InfoIcon"
          size="26"
        />
      </button>

      <button
        type="button"
        class="imgBox__close"
        @click="close"
      >
        &times;
      </button>
      <button
        v-if="hasMultipleImages"
        type="button"
        class="imgBox__previous"
        @click.stop="previousImage"
      >
        &lsaquo;
      </button>
      <div
        v-if="images"
        class="imgBox__container"
      >
        <figure>
          <transition name="image-fade">
            <div class="img_container_outter">
              <div class="img_container_inner">
                <img
                  :key="imageUrl"
                  :src="imageUrl"
                  :title="imageCaption"
                  :alt="imageCaption"
                  @click.stop="nextImage"
                />

                <div class="img_info">
                  <div
                    v-for="(info_value, info_label) in imageInfo"
                    :key="info_label"
                  >
                    {{ info_label }}: <span>{{ info_value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <figcaption>{{ imageCaption }}</figcaption>
        </figure>
      </div>
      <button
        v-if="hasMultipleImages"
        type="button"
        class="imgBox__next"
        @click.stop="nextImage"
      >
        &rsaquo;
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['images', 'index', 'bgcolor'],
  data() {
    return {
      imageIndex: this.index,
      img_box_info_view_local_storage:
        localStorage.getItem('img_box_info_view'),
    }
  },
  computed: {
    imageUrl() {
      return this.imageIndex !== null
        ? this.images[this.imageIndex].imageUrl
        : ''
    },
    imageCaption() {
      return this.imageIndex !== null
        ? this.images[this.imageIndex].caption
        : ''
    },
    imageInfo() {
      return this.imageIndex !== null ? this.images[this.imageIndex].info : ''
    },
    hasMultipleImages() {
      return this.images.length > 1
    },
    imgBox_style() {
      let style = ''
      if (this.bgcolor !== null) style += `background-color: ${this.bgcolor};`
      return style
    },
    info_show() {
      return this.img_box_info_view_local_storage === 'true' ? true : false
    },
  },
  watch: {
    index(value) {
      this.imageIndex = value
    },
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown_working)
    window.removeEventListener('click', this.click_working)
  },
  mounted() {
    console.log(this.images)
    console.log(this.index)

    window.addEventListener('keydown', this.keydown_working)
    window.addEventListener('click', this.click_working)

    // Preload the first image
    if (this.images.length > 0) {
      this.preLoad(this.images[0].imageUrl)
    }
  },
  methods: {
    click_working(e) {
      if (this.imageIndex === null) return
      if (this.imageIndex === 0) {
        if (this.images.length > 1) {
          this.preLoad(
            this.images[this.images.length - 1].imageUrl,
            this.images[this.imageIndex + 1].imageUrl
          )
        } else {
          this.preLoad(this.images[0].imageUrl)
        }
      } else if (this.imageIndex === this.images.length - 1) {
        this.preLoad(
          this.images[this.imageIndex - 1].imageUrl,
          this.images[0].imageUrl
        )
      } else {
        this.preLoad(
          this.images[this.imageIndex - 1].imageUrl,
          this.images[this.imageIndex + 1].imageUrl
        )
      }
    },
    keydown_working(e) {
      if (e.keyCode === 37) {
        // Left Arrow
        this.previousImage()
      }
      if (e.keyCode === 39) {
        // Right Arrow
        this.nextImage()
      }
      if (e.keyCode === 27) {
        // Escape Key
        this.close()
      }
    },
    toggle_info() {
      const info_show_new_value = `${!this.info_show}`

      this.img_box_info_view_local_storage = info_show_new_value
      localStorage.setItem('img_box_info_view', info_show_new_value)
    },
    close() {
      this.imageIndex = null
      this.$emit('close')
    },
    previousImage() {
      if (this.imageIndex === null) return
      this.imageIndex =
        this.imageIndex > 0 ? this.imageIndex - 1 : this.images.length - 1
      if (this.imageIndex > 0) {
        this.preLoad(this.images[this.imageIndex - 1].imageUrl)
      } else {
        this.preLoad(this.images[this.images.length - 1].imageUrl)
      }
    },
    nextImage() {
      if (this.imageIndex === null) return
      this.imageIndex =
        this.imageIndex < this.images.length - 1 ? this.imageIndex + 1 : 0
      if (this.imageIndex < this.images.length - 1) {
        this.preLoad(this.images[this.imageIndex + 1].imageUrl)
      } else {
        this.preLoad(this.images[0].imageUrl)
      }
    },
    preLoad(...urls) {
      const preloaded = []
      for (let idx = 0; idx < urls.length; idx++) {
        preloaded[idx] = new Image()
        preloaded[idx].src = urls[idx]
      }
    },
  },
}
</script>

<style lang="scss">
$black: #000;
$white: #fff;
$modal__bg: rgba($black, 0.9);

/* Modal Styles */
@mixin modal__base() {
  transition: opacity 0.2s ease;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: $modal__bg;
  display: table;
}
// Modal Entrance Transition
.image-box-enter {
  opacity: 0;
}
// Modal Container & Image
.imgBox {
  @include modal__base();
  &__container {
    position: absolute;
    overflow: hidden;
    cursor: pointer;
    max-width: 100vw;
    height: 100vh;
    margin: 1rem auto;
    left: 0.5rem;
    right: 0.5rem;
  }
  & figure {
    margin: 0;
    height: 100%;

    .img_container_outter {
      width: 92%;
      margin-left: 4%;
      height: calc(100vh - 2.5rem);
      object-fit: contain;

      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
    }

    .img_container_inner {
      position: relative;

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .img_info {
        $info_gap: 0.75rem;

        position: absolute;
        bottom: 6px;
        left: 0;
        right: 0;

        min-width: max-content;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        gap: $info_gap;

        padding: $info_gap;
        background-color: #00000075;
        color: #cdcdcd;
        font-size: 20px;
        span {
          font-weight: bold;
        }
      }
    }

    figcaption {
      position: absolute;
      top: 0;
      width: 100%;
      line-height: 2.5rem;
      background-color: rgba(0, 0, 0, 0.25);
      color: $white;
    }
  }
  &__close {
    color: $white;
    position: absolute;
    top: 5px;
    right: 0;
    background-color: transparent;
    border: none;
    font-size: 48px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 900;
    &:focus {
      outline: 0;
    }
  }
  &__info {
    color: $white;
    position: absolute;
    top: 5px;
    left: 0;
    background-color: transparent;
    border: none;
    font-size: 48px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 900;
    &:focus {
      outline: 0;
    }
  }
  &__previous,
  &__next {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    z-index: 900;
    cursor: pointer;
    color: $white;
    font-size: 64px;
    line-height: 64px;
    background-color: transparent;
    border: none;
    &:focus {
      outline: 0;
    }
  }
  &__previous {
    left: 0;
  }
  &__next {
    right: 0;
  }
}
// Image Change Transition
.image-fade-enter {
  opacity: 0;
}
.image-fade-enter-active {
  transition: all 0.5s ease;
}
</style>
