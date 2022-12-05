<template>
<div class="backButton" @click="$router.push('')">
 返回
</div>
</template>

<script>
export default {
  name: "BackButton"
}
</script>

<style scoped>
.backButton{
  background: #7c7cef;
  position: absolute;
  top: 5px;
  left: 1em;
  padding: 12px 9px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 33333;
  font-size: 12px;
}
</style>
