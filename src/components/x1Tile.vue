<template>
  <div class="tile" :class="{
    hidden: offscreen,
    'tile--focused': focused && index === selectedIndex,
    'tile--selected': index === selectedIndex
  }" :style="[customProperties]">
    <slot>Feed me!</slot>
  </div>
</template>

<style scoped>
.tile {
  --tx: 0;
  --ty: 0;
  --width: 0;
  --height: 0;
  --scale: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  height: var(--height);
  transition: all var(--speed-1);
  transform: translate3d(var(--tx), var(--ty), 0) scale(var(--scale));
}

.tile {
  border: 3px solid transparent;
  border-width: 3px 0;
}

.tile--focused {
  border-color: var(--white);
}

.hidden {
  display: none;
}
</style>

<script>
export default {
  name: 'x1Tile',

  props: {
    focused: {
      type: Boolean,
      default: false,
    },

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    activeScale: {
      type: Number,
      default: 1.075,
    },

    gutter: {
      type: Number,
      default: 10,
    },

    buffer: {
      type: Number,
      default: 5,
    },

    selectedIndex: {
      type: Number,
      required: true,
    },
  },

  computed: {
    offscreen () {
      const { selectedIndex, index, buffer } = this.$props
      return index < selectedIndex - 2 || index > selectedIndex + buffer
    },

    customProperties () {
      const { width, height, index, gutter, selectedIndex, activeScale, focused } = this.$props
      const tx = (width + gutter) * (index - selectedIndex)
      const ty = (height * activeScale - height) / 2
      const scale = focused && index === selectedIndex ? activeScale : 1

      return {
        '--ty': `${ty}px`,
        '--tx': `${tx}px`,
        '--width': `${width}px`,
        '--height': `${height}px`,
        '--scale': `${scale}`,
      }
    },
  },
}
</script>
