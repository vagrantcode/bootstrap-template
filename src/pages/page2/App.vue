<template>
  <div id="app">
    <back-button/>
    <div style="margin-top: 60px;">
      <span class="text">页面2</span>
    </div>
  </div>
</template>

<script>
import BackButton from "../../components/BackButton";

export default {
  name: "App.vue",
  components: {BackButton}
}
</script>

<style scoped lang="scss">
.text{
  color: $text-color;
}
</style>
