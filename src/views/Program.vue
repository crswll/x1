<template>
  <div class="program">
    <router-link :to="{ name: 'Programs', query: { focus: 'programs1' }}">Programs</router-link>
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
import x1StackedSelector from '../components/x1StackedSelector'
import x1Button from '../components/x1Button'

export default {
  name: 'Program',

  components: {
    Basic,
    x1StackedSelector,
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
      n: 2,
    }
  },

  computed: {
    program () {
      return store.getters['programs/getProgramById'](this.programId)
    },
  },
}
</script>
