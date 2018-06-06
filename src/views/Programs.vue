<template>
  <x1-page>
    <x1-tiles
      class="pt3 h-3-4"
      v-model="programId1"
      guid="programs1"
      :options="programOptions.slice(0, 10)"
      :focused-guid="focusedGuid"
      :cell-config="{ width: 205, height: 311 }"
      @exit-down="focus('programs2')"
      @select="to"
      @focus="scroll"
    >
      <h1 slot="title" class="h1 font-thin white m0 mb2">Recent Items</h1>
      <img
        slot-scope="{ option }"
        :src="option.url"
        :alt="option.title"
        style="height: 100%; width: 100%; display: block; background-color: #2b2b2b"
      >
      <div slot="info" v-if="program(programId1)">
        <h2 class="h2 font-thin m0 mb1">{{ program(programId1).title }} ({{ program(programId1).year }})</h2>
        <p class="h3 font-thin m0 gray" style="max-width: 75%;">{{ program(programId1).synopsis }}</p>
      </div>
    </x1-tiles>

    <x1-tiles
      class="pt3 h-3-4"
      :options="programOptions.slice(10, 20)"
      v-model="programId2"
      guid="programs2"
      :focused-guid="focusedGuid"
      @exit-up="focus('programs1')"
      @exit-down="focus('programs3')"
      @focus="scroll"
      :cell-config="{ width: 249, height: 332 }"
    >
      <h1 slot="title" class="h1 font-thin white m0 mb2">Free To Me</h1>
      <img
        slot-scope="{ option }"
        :src="option.url"
        :alt="option.title"
        style="height: 100%; width: 100%; display: block; background-color: #2b2b2b"
      >
      <div slot="info" v-if="program(programId2)">
        <h2 class="h2 font-thin m0 mb1">{{ program(programId2).title }} ({{ program(programId2).year }})</h2>
        <p class="h3 font-thin m0 gray" style="max-width: 75%;">{{ program(programId2).synopsis }}</p>
      </div>
    </x1-tiles>

    <x1-tiles
      class="pt3 h-3-4"
      :options="programOptions.slice(20, 30)"
      v-model="programId3"
      guid="programs3"
      :focused-guid="focusedGuid"
      @exit-up="focus('programs2')"
      @focus="scroll"
      :cell-config="{ width: 249, height: 332 }"
    >
      <h1 slot="title" class="h1 fw200 white m0 mb2">Free To Me</h1>
      <img slot-scope="{ option }" :src="option.url" :alt="option.title" style="height: 100%; width: 100%;">
    </x1-tiles>

    <ul>
      <li v-for="program in programs" :key="program.programId">
        <router-link :to="{ name: 'Program', params: { programId: program.programId } }">
          {{ program.title }}
        </router-link>
      </li>
    </ul>
  </x1-page>
</template>

<style>
.programs {
  transition: transform var(--speed-2) ease;
  transform: translate3d(0, var(--ty), 0);
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import x1Tiles from '../components/x1Tiles'
import x1Page from '../views/Page'

export default {
  name: 'Programs',

  components: {
    x1Tiles,
    x1Page,
  },

  data () {
    return {
      programId1: 'comcast:compass:program:5881303020318615112',
      programId2: 'comcast:compass:program:4654784291964651112',
      programId3: 'comcast:compass:program:5599149939674631112',
    }
  },

  computed: {
    ...mapGetters({
      programs: 'programs/programs',
      getProgramById: 'programs/getProgramById',
      focusedGuid: 'ui/focusedGuid',
    }),

    programOptions () {
      return this.programs.map(program => ({
        ...program,
        value: program.programId,
      }))
    },
  },

  beforeRouteEnter (to, from, next) {
    console.log(history.state)
    console.log('beforeRouteEnter to', to)
    console.log('beforeRouteEnter from', from)
    next()
  },

  beforeRouteLeave (to, from, next) {
    console.log(history.state)
    console.log('beforeRouteLeave to', to)
    console.log('beforeRouteLeave from', from)
    next()
  },

  methods: {
    ...mapActions({
      focus: 'ui/focus',
    }),

    program (id) {
      return this.getProgramById(id)
    },

    log (msg) {
      console.log(msg)
    },

    to ({ value }) {
      this.$router.push({
        name: 'Program',
        params: {
          programId: value,
        },
      })
    },

    scroll ({ x, y }) {
      this.$el.style.setProperty('--ty', `-${Math.abs(y)}px`)
    },
  },
}
</script>
