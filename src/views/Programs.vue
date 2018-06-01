<template>
  <div class="programs">
    <x1-tiles
      :options="programOptions"
      v-model="programId1"
      guid="programs1"
      :focused-guid="focusedGuid"
      @exit-down="focus('programs2')"
      :cell-config="{ width: 249, height: 332, scaleTo: 1.1, gutter: 10, buffer: 5 }"
    >
      <img slot-scope="{ option }" :src="option.url" :alt="option.title" style="height: 100%; width: 100%;">
    </x1-tiles>

    {{ programId1 }}

    <x1-tiles
      class="mt2"
      :options="programOptions"
      v-model="programId2"
      guid="programs2"
      :focused-guid="focusedGuid"
      @exit-up="focus('programs1')"
      :cell-config="{ width: 250, height: 150, scaleTo: 1.25, gutter: 10, buffer: 5 }"
    >
      <div
        slot-scope="{ option }"
        style="width: 100%; height: 100%;"
      >
        hi
      </div>
    </x1-tiles>

    {{ programId2 }}

    <ul>
      <li v-for="program in programs" :key="program.programId">
        <router-link :to="{ name: 'Program', params: { programId: program.programId } }">
          {{ program.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import x1Tiles from '../components/x1Tiles'

export default {
  name: 'Programs',

  components: {
    x1Tiles,
  },

  data () {
    return {
      programId1: 'comcast:compass:program:5881303020318615112',
      programId2: 'comcast:compass:program:5103617804193345112',
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

    program () {
      return this.getProgramById(this.programId)
    },
  },

  methods: {
    ...mapActions({
      focus: 'ui/focus',
    }),
  },
}
</script>
