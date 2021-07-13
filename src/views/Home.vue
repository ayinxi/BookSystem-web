<template>
  <div>
    <div class="bbb"></div>
    <div class="header">
      <div class="logo">
        <img src="../assets/lognname.png" />
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
      <div>
        <el-row class="shopping">
          <el-col :span="20">
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
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: " ",
    };
  },
  computed: {
    hasLogin() {
      return this.$store.state.token;
    },
  },
  methods: {
    gotoPersonPage() {
      this.$router.push("/person");
    },
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
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100px;
  margin: 20px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
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
