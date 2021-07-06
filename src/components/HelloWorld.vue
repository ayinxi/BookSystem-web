<template>
  <div class="login-container">
    <el-card shadow="hover" class="login-form">
      <el-form ref="form" :model="form" label-width="80px">
        <h2 class="login-title">图书管理系统</h2>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-row>
            <el-col span="10">
              <el-button @click="onSign">注册</el-button>
            </el-col>
            <el-col span="10">
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import { Button, Row, Col, Form, FormItem, Card } from "element-ui";
export default {
  components: {
    "el-button": Button,
    "el-col": Col,
    "el-row": Row,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-card": Card,
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
      console.log("submit!");
    },
    onSign(){
      this.$router.push("/pick");
    }
  },
};
</script>

<style acoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/login.png");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style> -->
