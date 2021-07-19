<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoPersonPage"
        content="我的收货地址"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data(){
        return{

        }
    },
    methods: {
      gotoPersonPage() {
          this.$router.push("/person");
      }
    }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>