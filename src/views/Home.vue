<template>
  <div class="home">
    <Hero/>
    <div class="wrapper">
      <Archive/>
    </div>
  </div>
</template>

<script>

import Hero from '@/components/Hero'
import Archive from '@/components/Archive'

export default {
  name: 'Home',
  components: {
    Hero,
    Archive
  },
}
</script>