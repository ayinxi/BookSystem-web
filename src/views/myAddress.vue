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
    <div class="newAddress">
      <el-form ref="newAddress" :model="newAddress" :rules="rules" label-width="80px" label-position="left">
        <el-form-item>
          <h3 style="color: pink">新增收货地址</h3>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newAddress.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="newAddress.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="phone">
          <el-input v-model="newAddress.address"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      newAddress: {
        name: "",
        phone: "",
        address: "",
      },
      rules: {
        phone: [
          { required: true, message: "电话号码不得为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入电话号码"));
              } else if (!/^1\d{10}$/.test(value)) {
                callback(new Error("请输入正确的11位手机号码"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "姓名不得为空", trigger: "blur" },
        ],
      address: [
          { required: true, message: "地址不得为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    gotoPersonPage() {
      this.$router.push("/person");
    },
  },
};
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>