<template>
  <div>
    <div class="header">
      <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
      <div class="title">个人主页</div>
    </div>
    <el-tabs class="tab" v-model="activeName">
      <el-tab-pane label="首页" name="first">
        <el-card shadow="always" class="personCard">
          <el-row style="display: flex; justify-content: flex-start">
            <el-col :span="10">
              <div>
                <img
                  style="
                    height: 30%;
                    width: 30%;
                    border-radius: 50%;
                    margin: 5%;
                  "
                  src="../assets/kuku.png"
                />
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row style="display: flex; justify-content: center">
            <el-col :span="2">
              <el-button type="text" size="meduim">待发货</el-button>
            </el-col>
            <el-divider
            class="vertical"
              direction="vertical"
              style="margin: 10px; height: 200px"
            ></el-divider>
            <el-col :span="2">
              <el-button type="text" size="meduim">待收货</el-button>
            </el-col>

            <el-col :span="2">
              <el-button type="text" size="meduim">已收货</el-button>
            </el-col>

            <el-col :span="2">
              <el-button type="text" size="meduim">退款</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="账户设置" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: "first",
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.tab {
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.title {
  color: #303133;
  text-align: center;
  font-size: 30px;
}
.personCard {
  width: 90%;
  height: 350px;
  margin: 20px 5%;
}
.vertical {
  display: inline-block;
  width: 1px;
  height: 100%; 
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
</style>