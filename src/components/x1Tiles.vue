<template>
  <div :class="classes">
    <slot name="title"/>
    <div class="relative mb2" :style="styles">
      <x1-tile
        v-for="(option, index) in options"
        :focused="focused"
        :key="option.value"
        :index="index"
        :width="cellConfigNormalized.width"
        :height="cellConfigNormalized.height"
        :gutter="cellConfigNormalized.gutter"
        :buffer="cellConfigNormalized.buffer"
        :active-scale="cellConfigNormalized.scaleTo"
        :selected-index="selectedIndex"
      >
        <slot :option="option">{{ option }}</slot>
      </x1-tile>
    </div>
    <slot name="info"/>
  </div>
</template>

<style scoped>
.tiles__container {
  position: relative;
}
</style>

<script>
import { focusable } from '../mixins'
import x1Tile from './x1Tile'

const CELL_CONFIG_DEFAULT = {
  width: 200,
  height: 300,
  scaleTo: 1.05,
  gutter: 25,
  buffer: 10,
}

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
      default: () => ({}),
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
    cellConfigNormalized () {
      return {
        ...CELL_CONFIG_DEFAULT,
        ...this.cellConfig,
      }
    },

    styles () {
      const { cellConfigNormalized: { height, scaleTo } } = this

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
    this.$on('up', () => this.$emit('exit-up'))
    this.$on('down', () => this.$emit('exit-down'))
    this.$on('ok', () => this.$emit('select', { value: this.value }))
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
