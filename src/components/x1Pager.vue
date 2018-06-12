<template>
  <div class="pager flex align-center">
    <div
      v-for="page in pages"
      :key="page"
      :class="['page', { 'page--active': page === value }]"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    pages: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>
  .pager {
    --pager-dot-size: 15px;
    --pager-dot-gap: calc(var(--pager-dot-size) / 2);
  }

  .page {
    border-radius: 50%;
    display: inline-block;
    opacity: var(--pager-dot-opacity, 0.3);
    background-color: var(--pager-dot-color, var(--primary));
    margin-right: var(--pager-dot-gap);
    width: var(--pager-dot-size);
    height: var(--pager-dot-size);
  }

  .page--active {
    opacity: var(--pager-dot-opacity-active, 1);
  }
</style>
