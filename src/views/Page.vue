<template>
  <div class="page" :style="customProperties">
    <slot/>
  </div>
</template>

<style scoped>
.page {
  --tx: 0;
  --ty: 0;
  transition: transform var(--speed-1);
  transform: translate3d(var(--tx), var(--ty), 0)
}
</style>

<script>
export default {
  props: {
    scrollPosition: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
  },

  computed: {
    customProperties () {
      const { scrollPosition } = this.$props
      const { x, y } = scrollPosition

      return {
        '--tx': `${x}px`,
        '--ty': `-${y}px`,
      }
    },
  },
}
</script>
