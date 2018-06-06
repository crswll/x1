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
      const { offsetLeft: x, offsetTop: y } = this.$el

      if (isFocused) {
        this.$emit('focus', { x, y })
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
    const { guid, order, handleInput } = this

    this.activateFocusable({ guid, order, active: true })
    Remote.$on(EVENTS.KEY_DOWN, handleInput)
  },

  destroyed () {
    const { guid, handleInput } = this

    this.deactivateFocusable({ guid, active: false })
    Remote.$off(EVENTS.KEY_DOWN, handleInput)
  },
}
