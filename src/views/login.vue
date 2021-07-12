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
            <img src="../assets/login.png" />
          </div>
          <div>
            <el-card shadow="always">
              <div>
                <h2 class="login-title">教我编程图书商城</h2>
                <el-form :model="form" status-icon :rules="rules" ref="form">
                  <el-form-item prop="username">
                    <el-row class="inputContent">
                      <el-col :span="2">
                        <i class="el-icon-user" style="font-size: 20px" />
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="form.username" placeholder="邮箱" >
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-row class="inputContent">
                      <el-col :span="2">
                        <i class="el-icon-unlock" style="font-size: 20px" />
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="form.password" placeholder="密码" type="password">
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-row class="inputContent">
                      <el-col :offset="2">
                        <el-button
                          type="primary"
                          @click="onSubmit"
                          style="
                            width:60%;
                            margin-top: 10px;
                            margin-left: 20px;
                            margin-right: 10px;
                          "
                          >登录
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
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
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "邮箱格式不正确！", trigger: "blur" ,type:"email"},
        ],
      },
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      let parmas = {
        username: this.form.username,
        password: this.form.password
      };
      const res = await this.$http.get("/api/login", parmas);
      const { code, token, massage } = res.data;
      //code=='0'表示登录成功，进行本地存储和store存储 并进行跳转。
      //else 弹出错误提示
      if (code == "0") {
        this.$store.commit("token", res.data.token);
        localStorage.setItem("token", token);
        //如果是由需要鉴权的页面跳转到登录页面 则redirect= this.$route.query.redirect，如果是直接点击登录跳转到登录页面，则redirect= '/'
        //const redirect = this.$route.query.redirect || "/";
        //this.$router.push(redirect);
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: massage || "登录失败",
          type: "error"
        });
        toast.show();
      }
    },
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
  justify-content:flex-start;
  align-items: center;
  width: 100%;
  margin-left:20%;
}
.el-card {
  margin: 5%;
  width: 500px;
  height: 400px;
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
</style> 