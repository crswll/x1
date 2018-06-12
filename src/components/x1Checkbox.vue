<template>
  <div :class="classes">
    <label class="checkbox flex items-center">
      <div class="input mr1">
        <input
          type="checkbox"
          @change="toggle"
          :checked.prop="checked"
          :value="trueValue"
          hidden
        >
        <div
          v-show="checked"
          class="checkmark"
        >
          <img class="check" src="../assets/icons/PNG/check.png" alt="Checked">
        </div>
      </div>
      <div class="label auto">
        <slot/>
      </div>
    </label>
  </div>
</template>

<script>
import { focusable } from '../mixins'

export default {
  mixins: [
    focusable,
  ],

  props: {
    value: {
      required: true,
      type: null,
    },

    trueValue: {
      type: Boolean,
      default: true,
    },

    falseValue: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes () {
      return {
        'checkbox': true,
        'checkbox--focused': this.focused,
      }
    },

    checked () {
      return this.value === this.trueValue
    },
  },

  created () {
    this.$on('ok', this.toggle)
  },

  methods: {
    toggle () {
      const { value, trueValue, falseValue } = this
      const nextValue = value === trueValue
        ? falseValue
        : trueValue

      this.$emit('input', nextValue)
    },
  },
}
</script>

<style scoped>
.input {
  width: 40px;
}

.check {
  height: 30px;
}

.checkbox--focused {
  border: 3px solid #fff;
  border-width: 3px 0;
}
</style>
