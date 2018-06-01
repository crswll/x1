<template>
  <button>
    <slot/>
  </button>
</template>

<script>
import { focusable } from '../mixins'

export default {
  mixins: [
    focusable,
  ],
}
</script>
