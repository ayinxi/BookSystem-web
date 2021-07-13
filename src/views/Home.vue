<template>
  <div v-loading="isLoading">
    <div class="bbb"></div>
    <div class="header">
      <div class="logo">
        <img src="../assets/jwbc.png" />
      </div>
      <div class="search">
        <el-input
          placeholder="给孩子的第一本编程书籍"
          v-model="input"
          style="width: 500px"
        >
          <el-button slot="append" icon="el-icon-search"> </el-button>
        </el-input>
      </div>
      <div v-if="hasRole==0||1">
        <el-row class="shopping">
          <el-col :span="10">
            <el-badge :value="12" class="shopping">
              <el-button size="meduim" icon="el-icon-shopping-cart-2"
                >我的购物车</el-button
              >
            </el-badge>
          </el-col>
          <el-col :span="5" class="pageperson">
            <el-button
              size="meduim"
              class="pageperson"
              icon="el-icon-s-custom"
              @click="gotoPersonPage"
              >个人主页</el-button
            >
          </el-col>
           <el-col class="pageperson">
            <i class="iconfont-tuichu" style="font-size:20px" @click.native="loginOut" />
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row class="shopping">
          <el-col>
            <el-button size="meduim" type="text">注册</el-button>
          </el-col>
           <el-col>
            <el-button size="meduim" type="text">登陆</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading:false,
      input: " ",
    };
  },
  computed: {
    hasRole() {
      return this.$store.state.roleHasLoad;
    },
    hasLogin() {
      return this.$store.state.token;
    },
  },
  methods: {
    gotoPersonPage() {
      this.$router.push("/person");
    },
    loginOut(){
      this.isLoading=true;
      this.$store.commit("clearCache");
      this.isLoading=false;
    }
  },
};
</script>

<style>
.bbb {
  background: url("../assets/blank.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
}
.logo {
  display: flex;
  justify-content: center;
  height: 100px;
  width: 200px;
  margin: 20px 100px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-left:100px;
}
.shopping {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.pageperson {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>
