<template>
  <div id="app" class="app mx4">
    <transition
      :enter-active-class="`animated ${transition.enter}`"
      :leave-active-class="`animated ${transition.leave}`"
      :mode="transition.mode"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Remote from './remote'
import { EVENTS } from './constants'

export default {
  name: 'App',

  computed: {
    ...mapGetters('ui', [
      'transition',
    ]),
  },

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
  @import "./assets/css/animate";
  @import "./assets/css/utility";
  @import "./assets/css/theme";

  :root {
    background-color: var(--black);
    color: var(--white);
    overflow: hidden;
    user-select: none;
  }

  button {
    background-color: transparent;
    border: none;
  }

  .animated {
    animation-duration: var(--speed-2);
  }
</style>
