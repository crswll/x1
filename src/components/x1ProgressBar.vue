<template>
  <div class="progress-bar">
    <div
      class="bar"
      :class="[classes]"
      :style="[barStyles]"
    />
  </div>
</template>

<style scoped>
.progress-bar {
  background-color: var(--progress-bar-background, var(--background));
  height: var(--progress-bar-height, 5px);
}

.bar {
  height: 100%;
  width: 0;
  background-color: var(--progress-bar-color, var(--white));
  transition: all var(--speed-1) ease-out;
}

.bar--completed {
  background-color: var(--progress-bar-color-completed, var(--success));
}

.bar--failed {
  background-color: var(--progress-bar-color-failed, var(--failure));
}
</style>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    failed: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    barStyles () {
      return {
        width: `${this.value * 100}%`,
      }
    },

    classes () {
      const { value, failed } = this.$props
      const completed = value === 1

      return {
        'bar--completed': completed,
        'bar--failed': failed,
      }
    },
  },
}
</script>
