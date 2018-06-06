<template>
  <div class="page" :style="customProperties">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
  },

  computed: {
    customProperties () {
      const { position } = this.$props
      const { x, y } = position

      return {
        '--tx': x,
        '--ty': y,
      }
    },
  },
}
</script>

<style scoped>
.page {
  --tx: 0;
  --ty: 0;
  transition: transform var(--speed-1);
  transform: translate3d(var(--tx), var(--ty), 0)
}
</style>
