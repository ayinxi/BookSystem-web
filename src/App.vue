<template>
  <div >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
  },
  computed: {
    hasLogin() {
      return this.$store.state.token;
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background:rgb(255, 255, 255);
}
</style>
