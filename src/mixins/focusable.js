import { mapMutations } from 'vuex'
import { EVENTS } from '../constants'
import { getKeyFromKeyCode } from '../helpers'
import Remote from '../remote'

export default {
  props: {
    guid: {
      type: String,
      required: true,
    },

    focusedGuid: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    disabled: {
      type: Boolean,
    },

    hidden: {
      type: Boolean,
    },
  },

  computed: {
    focused () {
      return this.focusedGuid === this.guid
    },
  },

  watch: {
    focused (isFocused, wasFocused) {
      const { offsetTop: y } = this.$el
      if (isFocused) {
        this.$emit('focus', { x: 0, y })
      }

      if (wasFocused) {
        this.$emit('blur')
      }
    },
  },

  methods: {
    ...mapMutations('ui', [
      'activateFocusable',
      'deactivateFocusable',
    ]),

    handleInput ({ event }) {
      if (!this.focused) {
        return
      }

      const key = getKeyFromKeyCode(event.keyCode)

      this.$emit(key, {
        event,
      })
    },
  },

  created () {
    Remote.$on(EVENTS.KEY_DOWN, this.handleInput)
  },

  destroyed () {
    Remote.$off(EVENTS.KEY_DOWN, this.handleInput)
  },
}
