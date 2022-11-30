<template>
  <div :id="id" ref="chart">

  </div>
</template>

<script>
import {guid} from "mw-libs";
import * as echarts from 'echarts'

export default {
  name: "VueEcharts",
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      id: guid(),
      chart: null
    }
  },
  methods: {
    setOption() {
      this.chart.setOption(this.options)
    },
    resize() {
      this.chart && this.chart.resize()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.chart)
      this.setOption()
      window.addEventListener('resize', this.resize)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped>

</style>
