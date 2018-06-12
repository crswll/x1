---
title: Blogging Like a Hacker
lang: en-US
---

# Hello VuePress

{{ $page }}

* I
* Am
* Iron Man

::: v-pre
`{{ This will be displayed as-is }}`
:::

<span v-for="i in 3">{{ i }} </span>

<x1Button guid="example" focusedGuid="example">Hi</x1Button>

<script>
import x1Button from '../src/components/x1Button.vue'
export default {
  components: {
    x1Button,
  },
}
</script>
