<template>
  <div id="app" class="app mx4 my2">
    <div class="flex">
      <router-link class="mr2" :to="{ name: 'Programs', query: { 'foo': 'bar' } }">Home</router-link>
      <button @click="$router.push({ query: null })">No</button>
    </div>
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
  @import "basscss";
  @import "./assets/css/base";
  @import "./assets/css/theme";

  :root {
    background-color: var(--background);
    overflow: hidden;
  }
</style>
