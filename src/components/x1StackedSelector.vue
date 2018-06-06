<template>
  <div :class="classes" class="flex items-center">
    <label :for="id">{{ label }}</label>
    <x1-icon :src="require('../assets/icons/chevron-right.svg')"/>
    <select :id="id" v-model="localValue">
      <option v-for="option in normalizedOptions" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { focusable } from '../mixins/'
import { KEYS } from '../constants'
import x1Icon from '../components/x1Icon'

export default {
  components: {
    x1Icon,
  },

  mixins: [
    focusable,
  ],

  props: {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: null,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      transition: 'slide-left',
    }
  },

  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },

    id () {
      return `_${this._uid}`
    },

    classes () {
      return {
        'ss': true,
        'ss--focused': this.focused,
      }
    },

    normalizedOptions () {
      return this.options.map(option => {
        return typeof option !== 'object' ? { text: option, value: option } : option
      })
    },

    selectedIndex () {
      return this.normalizedOptions.findIndex(option => option.value === this.value)
    },

    selectedOption () {
      return this.normalizedOptions[this.selectedIndex]
    },

    atStart () {
      return this.selectedIndex === 0
    },

    atEnd () {
      return this.selectedIndex === this.normalizedOptions.length - 1
    },
  },

  watch: {
    selectedIndex (index, previousIndex) {
      const direction = index > previousIndex ? 'left' : 'right'
      this.transition = `slide-${direction}`
    },
  },

  created () {
    this.$on(KEYS.RIGHT, this.next)
    this.$on(KEYS.LEFT, this.previous)
    this.$on(KEYS.DOWN, () => this.$emit('move-down'))
    this.$on(KEYS.UP, () => this.$emit('move-up'))
  },

  destroyed () {
    this.$off()
  },

  methods: {
    next () {
      const { selectedIndex, normalizedOptions } = this
      const next = normalizedOptions[selectedIndex + 1]

      if (next) {
        this.$emit('input', next.value)
      } else {
        this.$emit('exit-right')
      }
    },

    previous () {
      const { selectedIndex, normalizedOptions } = this
      const prev = normalizedOptions[selectedIndex - 1]

      if (prev) {
        this.$emit('input', prev.value)
      } else {
        this.$emit('exit-left')
      }
    },
  },
}
</script>
