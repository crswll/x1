<template>
  <span class="icon"/>
</template>

<style>
  .icon {
    display: inline-block;
  }

  .icon > svg {
    width: 100%;
    height: 100%;
  }
</style>

<script>
const cache = new Map()

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  async mounted () {
    const { src } = this.$props

    if (!cache.has(src)) {
      cache.set(src, fetch(src).then(r => r.text()))
    }

    this.$el.innerHTML = await cache.get(src)
  },
}
</script>
