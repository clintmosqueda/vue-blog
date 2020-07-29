<template>
  <div class="sample">
    <div class="wrapper">
      sample page
      <SampleResult/>
      <SampleCounter/>
    </div>
  </div>
</template>

<script>
import SampleResult from '@/components/SampleResult'
import SampleCounter from '@/components/SampleCounter'
export default {
  name: 'Sample',
  components: {
    SampleResult,
    SampleCounter
  }
}
</script>

<style lang="sass">
.sample
  height: 100vh
</style>