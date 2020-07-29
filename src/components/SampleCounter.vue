<template>
  <div>
    <h3>sample counter</h3>
    <button @click="countUp">count ++</button> | 
    <button @click="countDown">counter --</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SampleCounter',
  methods: {
    ...mapMutations([
      'countUp',
      'countDown'
    ]),
  },
}
</script> 