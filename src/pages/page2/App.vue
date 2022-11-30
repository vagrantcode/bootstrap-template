<template>
  <div id="app">
    <back-button/>
    <div style="margin-top: 60px;">
      页面2
    </div>
  </div>
</template>

<script>
import BackButton from "../../libs/vue/BackButton";

export default {
  name: "App.vue",
  components: {BackButton}
}
</script>

<style scoped>

</style>
