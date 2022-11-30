<template>
  <div id="app">
    <nav style="position: relative;height: 60px;padding: 15px 0;">
      <div class="h1" style="position: absolute;left: 50%;top:50%;transform:translate(-50%,-50%)">欢迎使用多页面应用</div>
    </nav>
    <div class="row">
      <div v-for="(item,index) in pages" :key="index" class="col-md-4">
        <div class="card mb-3 shadow-sm">
          <svg class="bd-placeholder-img card-img-top"
               width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img"
               aria-label="Placeholder: Thumbnail"
               preserveAspectRatio="xMidYMid slice"
               focusable="false"><title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c"></rect>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ item.name }}</text>
          </svg>
          <div class="card-body">
            <p class="card-text">
              {{ item.meta.des }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary btn-primary text-white" @click="$router.push(item)">View</button>
              </div>
              <!--            <small class="text-muted">9 mins</small>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//在src下的目录名就是对应的页面资源路径，比如：page1对应页面url/page1.html
const pages = [
  {
    path: 'page1',
    name: '页面1',
    meta: {
      des: '第一个页面'
    }
  },
  {
    path: 'page2',
    name: '页面2',
    meta: {
      des: '第二个页面'
    }
  }
]
export default {
  name: "App.vue",
  data() {
    return {
      pages: pages
    }
  }
}
</script>

<style scoped lang="scss">

</style>
