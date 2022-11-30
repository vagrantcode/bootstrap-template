<template>
  <div id="app">
    <back-button/>
    <vue-chart style="width: 50%;height: 30%;" :options="option"/>
  </div>
</template>

<script>

import VueChart from "../../libs/vue/VueChart";
import BackButton from "../../libs/vue/BackButton";

export default {
  name: "App.vue",
  components: {BackButton, VueChart},
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
