<template>
  <div id="app">
    <div class="left-div">
      <leftNav/>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/common/leftNav";
export default {
  name: "App",
  data: function() {
    return {};
  },
  components: {
    leftNav
  }
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
a {
  color: #fff;
  text-decoration: none;
}
html,
body {
  height: 100%;
}

#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  float: left;
}
.left-div {
  float: left;
  width: 8%;
  height: 100%;
}
.main {
  float: left;
  width: 92%;
  height: 100%;
}
</style>
