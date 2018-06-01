<template>
  <div :class="classes" :style="styles">
    <x1-tile
      v-for="(option, index) in options"
      :focused="focused"
      :key="option.value"
      :index="index"
      :width="cellConfig.width"
      :height="cellConfig.height"
      :gutter="cellConfig.gutter"
      :buffer="cellConfig.buffer"
      :active-scale="cellConfig.scaleTo"
      :selected-index="selectedIndex"
    >
      <slot :option="option">{{ option }}</slot>
    </x1-tile>
  </div>
</template>

<style scoped>
.tiles {
  position: relative;
}
</style>

<script>
import { focusable } from '../mixins'
import x1Tile from './x1Tile'

export default {
  name: 'x1Tiles',

  components: {
    x1Tile,
  },

  mixins: [
    focusable,
  ],

  props: {
    cellConfig: {
      type: Object,
      default: () => ({
        width: 200,
        height: 300,
        scaleTo: 1.2,
        gutter: 20,
      }),
    },

    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: null,
      required: true,
    },
  },

  computed: {
    styles () {
      const { cellConfig: { height, scaleTo } } = this.$props

      return {
        height: `${height * scaleTo}px`,
      }
    },

    classes () {
      return {
        'tiles': true,
        'tiles--focused': this.focused,
      }
    },

    selectedIndex () {
      const { options, value } = this
      return options.findIndex(option => option.value === value)
    },

    atStart () {
      return this.selectedIndex === 0
    },

    atEnd () {
      return this.selectedIndex === this.options.length - 1
    },
  },

  created () {
    this.$on('right', this.next)
    this.$on('left', this.previous)

    // Components should be responsible for handling a focus "exit" (is "blur" web only?)...
    this.$on('up', () => this.$emit('exit-up'))
    this.$on('down', () => this.$emit('exit-down'))
  },

  methods: {
    next () {
      const { selectedIndex, options } = this
      const next = options[selectedIndex + 1]

      if (next) {
        this.$emit('input', next.value)
      } else {
        this.$emit('exit-right')
      }
    },

    previous () {
      const { selectedIndex, options } = this
      const prev = options[selectedIndex - 1]

      if (prev) {
        this.$emit('input', prev.value)
      } else {
        this.$emit('exit-left')
      }
    },
  },
}
</script>
