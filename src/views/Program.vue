<template>
  <div class="program">
    <x1-button
      guid="back"
      :focused-guid="focusedGuid"
      @last="$router.push({ name: 'Programs', query: { focus: 'programs1' }})"
    >Back</x1-button>

    <h1>Press `esc` to go back.</h1>
    <basic v-if="program">
      <img slot="poster" :src="program.url">
      <template slot="info" class="foo">
        <h1 class="h1 regular mb1">{{ program.title }}</h1>
        <p>{{ program.synopsis }}</p>
      </template>
    </basic>
  </div>
</template>

<script>
import store from '../store'
import Basic from '../views/Basic'
import x1Button from '../components/x1Button'

export default {
  name: 'Program',

  components: {
    Basic,
    x1Button,
  },

  props: {
    programId: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      focusedGuid: 'back',
    }
  },

  computed: {
    program () {
      return store.getters['programs/getProgramById'](this.programId)
    },
  },
}
</script>
