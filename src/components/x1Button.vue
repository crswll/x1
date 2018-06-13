<template>
  <button :class="{ focused }">
    <slot/>
  </button>
</template>

<style>
  .focused {
    background-color: red;
  }
</style>

<script>
import { focusable } from '../mixins'

export default {
  mixins: [
    focusable,
  ],

  created () {
    this.$on('up', () => this.$emit('exit-up'))
    this.$on('right', () => this.$emit('exit-right'))
    this.$on('down', () => this.$emit('exit-down'))
    this.$on('left', () => this.$emit('exit-left'))
  },
}
</script>
