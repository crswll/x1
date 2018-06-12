<template>
  <nav class="tabs flex justify-between">
    <button
      v-for="option in options"
      :key="option"
      :class="['tab', 'py1', 'px2', 'h1', 'font-thin', { 'tab--active': option === value }]"
    >
      {{ option }}
    </button>
  </nav>
</template>

<style scoped>
.tabs {
  border: 1px solid var(--white);
  border-width: 1px 0;
}

.tab--active {
  color: var(--primary);
  border: 2px solid var(--white);
  border-width: 2px 0;
}
</style>

<script>
import { focusable } from '../mixins'

export default {
  mixins: [
    focusable,
  ],

  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },

    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    selectedTabIndex () {
      const { options, value } = this.$props
      return options.indexOf(value)
    },
  },

  created () {
    this.$on('left', this.left)
    this.$on('right', this.right)
    this.$on('down', () => this.$emit('exit-down'))
    this.$on('up', () => this.$emit('exit-up'))
    this.$on('ok', () => this.$emit('select', this.value))
  },

  methods: {
    left () {
      const { options, selectedTabIndex } = this
      const left = options[selectedTabIndex - 1]

      if (left) {
        this.$emit('input', left)
      } else {
        this.$emit('exit-left')
      }
    },
    right () {
      const { options, selectedTabIndex } = this
      const right = options[selectedTabIndex + 1]

      if (right) {
        this.$emit('input', right)
      } else {
        this.$emit('exit-right')
      }
    },
  },
}
</script>
