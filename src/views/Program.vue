<template>
  <div class="program">
    <x1-stacked-selector
      focused-guid="foo"
      guid="foo"
      label="whoa"
      :options="[1, 2, 3, 4, 5]"
      v-model="n"
      @down="log('b1')"
      @exit-down="focus('foo')"
    />

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
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      getProgramById: 'programs/getProgramById',
    }),

    program () {
      return this.getProgramById(this.programId)
    },
  },
}
</script>
