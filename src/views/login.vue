<template>
  <div class="back">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">教我编程图书商城</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="10">
            <el-button @click="onSign">注册</el-button>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { Button, Row, Col, Form, FormItem } from "element-ui";
export default {
  components: {
    "el-button": Button,
    "el-col": Col,
    "el-row": Row,
    "el-form": Form,
    "el-form-item": FormItem,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/home");
    },
    onSign() {
      this.$router.push("/pick");
    },
  },
};
</script>

<style acoped>
.login-form {
  width: 350px;
  margin: auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255); /* 透明背景色 */
  padding: 30px;
  border-radius: 10px; /* 圆角 */
}

/* 背景 */
.back {
  display:flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/login.png");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> 