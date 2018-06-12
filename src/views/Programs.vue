<template>
  <x1-page :scroll-position="scrollPosition">
    <div class="flex justify-between h3 py3">
      <div>On Demand: {{ selectedTab }}</div>
      <div>2:32p / 76°</div>
    </div>
    <x1-tabs
      :options="['Movies', 'TV', 'Kids', 'Networks', 'Music', 'Events', 'Latino']"
      :focused-guid="focusedGuid"
      v-model="selectedTab"
      guid="tabs"
      @exit-down="focus('programs1')"
      @focus="scroll({ x: 0, y: 0 })"
    />
    <x1-tiles
      class="pt3 h-3-4"
      v-model="programId1"
      guid="programs1"
      :options="programOptions.slice(0, 10)"
      :focused-guid="focusedGuid"
      :cell-config="{ width: 205, height: 311 }"
      @exit-down="focus('programs2')"
      @exit-up="focus('tabs')"
      @select="to"
      @last="focus('tabs')"
      @focus="scroll"
    >
      <h1 slot="title" class="h1 font-thin white m0 mb2">Recent Items</h1>
      <img
        slot-scope="{ option }"
        :src="option.url"
        :alt="option.title"
        style="height: 100%; width: 100%; display: block; background-color: #2b2b2b"
      >
      <div slot="info">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="getProgramById(programId1) && focusedGuid === 'programs1'">
            <h2 class="h2 font-thin m0 mb1">{{ getProgramById(programId1).title }} ({{ getProgramById(programId1).year }})</h2>
            <p class="h4 font-thin m0 gray" style="max-width: 85%;">{{ getProgramById(programId1).synopsis }}</p>
          </div>
        </transition>
      </div>
    </x1-tiles>

    <x1-tiles
      class="pt3 h-3-4"
      v-model="programId2"
      guid="programs2"
      :options="programOptions.slice(0, 10)"
      :focused-guid="focusedGuid"
      :cell-config="{ width: 205, height: 311 }"
      @exit-up="focus('programs1')"
      @select="to"
      @last="focus('tabs')"
      @focus="scroll"
    >
      <h1 slot="title" class="h1 font-thin white m0 mb2">Kitty Cat Movies</h1>
      <img
        slot-scope="{ option }"
        :src="option.url"
        :alt="option.title"
        style="height: 100%; width: 100%; display: block; background-color: #2b2b2b"
      >
      <div slot="info">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="getProgramById(programId1) && focusedGuid === 'programs2'">
            <h2 class="h2 font-thin m0 mb1">{{ getProgramById(programId2).title }} ({{ getProgramById(programId2).year }})</h2>
            <p class="h4 font-thin m0 gray" style="max-width: 85%;">{{ getProgramById(programId2).synopsis }}</p>
          </div>
        </transition>
      </div>
    </x1-tiles>
  </x1-page>
</template>

<style scoped>
.l {
  --pager-dot-color: hotpink;
}
</style>

<script>
import { mapGetters } from 'vuex'
import x1Page from '../views/Page'
import x1Pager from '../components/x1Pager'
import x1ProgressBar from '../components/x1ProgressBar'
import x1Tabs from '../components/x1Tabs'
import x1Tiles from '../components/x1Tiles'

export default {
  name: 'Programs',

  components: {
    x1Page,
    x1Pager,
    x1ProgressBar,
    x1Tabs,
    x1Tiles,
  },

  data () {
    return {
      programId1: 'comcast:compass:program:5881303020318615112',
      programId2: 'comcast:compass:program:5881303020318615112',
      selectedTab: 'Movies',
      focusedGuid: '',
      scrollPosition: { x: 0, y: 0 },
    }
  },

  computed: {
    ...mapGetters({
      programs: 'programs/programs',
      getProgramById: 'programs/getProgramById',
    }),

    programOptions () {
      return this.programs.map(program => ({
        ...program,
        value: program.programId,
      }))
    },

    percentage () {
      const { programs, programId1 } = this
      return programs.findIndex(program => program.programId === programId1) / (programs.length - 1)
    },
  },

  methods: {
    focus (guid) {
      this.focusedGuid = guid
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
      this.scrollPosition = { x, y }
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        vm.focusedGuid = to.query.focus || 'tabs'
      })
    })
  },

  beforeRouteLeave (to, from, next) {
    console.log(this.focusedGuid)
    next()
  },
}
</script>
