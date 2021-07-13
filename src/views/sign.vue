<template>
  <div>
    <div class="header">
      <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
    </div>
    <div>
      <div class="back">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div style="margin: 5%">
            <img src="../assets/login.jpg" />
          </div>
          <div>
            <el-card shadow="always">
              <el-form
                ref="userInfo"
                :rules="rules"
                :model="userInfo"
                label-width="80px"
                label-position="left"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-wrap: wrap;
                "
              >
                <el-form-item>
                  <h2 class="login-title">新用户注册</h2>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="userInfo.name"> </el-input>
                </el-form-item>
                <el-form-item label="绑定邮箱" prop="username">
                  <el-input v-model="userInfo.username"> </el-input>
                </el-form-item>
                <el-form-item>
                  <i
                    class="el-icon-warning-outline"
                    style="margin-right: 5px"
                  ></i>
                  <i style="color: #909399"
                    >邮箱一旦绑定不得更改，如有需要请联系管理员</i
                  >
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="userInfo.password" type="password">
                  </el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkpass">
                  <el-input v-model="userInfo.checkpass" type="password">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onSign"
                    style="
                      width: 250px;
                      margin-top: 10px;
                      margin-left: 20px;
                      margin-right: 10px;
                    "
                    >注册</el-button
                  >
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      userInfo: {
        name: "",
        username: "",
        password: "",
        checkpass: "",
      },
      rules: {
        name: [{ required: true, message: "昵称不得为空", trigger: "blur" }],
        username: [
          {
            required: true,
            message: "邮箱格式不正确！",
            trigger: "blur",
            type: "email",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, message: "密码不得低于3位！", trigger: "blur" },
        ],
        checkpass: [
          { required: true, message: "确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.userInfo.password) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSign() {
      this.$router.push("/sign");
    },
  },
};
</script>

<style acoped>
.login-form {
  width: 500px;
  margin: auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255); /* 透明背景色 */
  padding: 30px;
}

/* 背景 */
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 8%;
  margin-right: 8%;
  width: 81%;
  height: 70%;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.el-input {
  width: 250px;
  margin: 10px 20px;
}
.inputContent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20%;
}
.el-card {
  margin: 5%;
  width: 500px;
  height: 550px;
}
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form-item__error {
  top: 80%;
  right: 25% !important;
  left: unset;
}
.el-form-item{
  margin-bottom: 10px;
}
</style> 