<template>
  <div>
    <span>sample result count: {{doubleCounter}}</span>
    <p>{{clickCounter}} inprogress</p>
    <p>logged in {{authenticateStatus}}</p>
    <p>logged in {{user.email}}</p>
    <p>logged in {{user.password}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SampleResult',
  computed: {
    ...mapGetters([
      'doubleCounter',
      'clickCounter',
      'authenticateStatus',
      'user'
    ])
  }
}
</script>
