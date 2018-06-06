<template>
  <div id="app" class="app mx4">
    <router-view/>
  </div>
</template>

<script>
import Remote from './remote'
import { EVENTS } from './constants'

export default {
  created () {
    window.addEventListener(
      'keydown',
      this.handleKeyDown
    )
  },

  destroyed () {
    window.removeEventListener(
      'keydown',
      this.handleKeyDown
    )
  },

  methods: {
    handleKeyDown (event) {
      Remote.$emit(EVENTS.KEY_DOWN, {
        event,
      })
    },
  },
}
</script>

<style>
  @import "./assets/css/fonts";
  @import "./assets/css/base";
  @import "./assets/css/utility";
  @import "./assets/css/theme";

  :root {
    background-color: var(--black);
    color: var(--white);
    overflow: hidden;
  }
</style>
