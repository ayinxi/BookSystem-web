<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoPerson"
        content="资料修改"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账户设置" name="first">
          <div
            style="display: flex; justify-content: center; align-items: center;margin-top:10px"
          >
            <el-form ref="userInfo" :model="userInfo" label-width="80px">
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-form-item label="用户头像" prop="avatar_s">
                    <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action="http://47.94.131.208:8888"
                      :show-file-list="false"
                      :on-change="changePhotoFile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :auto-upload="false"
                      :name="this.userInfo.avatar_b"
                    >
                      <img
                        v-if="this.userInfo.avatar_b"
                        :src= this.userInfo.avatar_b
                        class="avatar"
                      />
                      <img v-else src="../assets/avatar.jpg" class="avatar" />
                      <div class="avatar-uploader-icon">
                        <i
                          class="el-icon-warning-outline"
                          style="margin-right: 5px; color: #909399"
                        ></i>
                        <i style="color: #909399">点击头像进行修改</i>
                      </div>
                    </el-upload>
                    <my-cropper
                      ref="myCropper"
                      @getFile="getFile"
                      @upAgain="upAgain"
                    ></my-cropper>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="用户昵称" prop="name">
                    <el-input v-model="userInfo.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="绑定邮箱" prop="username">
                    <span>{{ userInfo.username }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px; color: #909399"
                    ></i>
                    <i style="color: #909399"
                      >邮箱一旦绑定不得更改，如有需要请联系管理员</i
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="confirmChange"
                      >确认修改</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MyCropper from "./cropper.vue";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {
    MyCropper,
  },
  prop: {
    username: String,
  },
  data() {
    return {
      isLoading: false,
      activeName: "first",
      userInfo: {
        avatar_b: "",
        avatar_s: "",
        username: "",
        name: "",
        password: "",
      },
      dialogVisible: false,
    };
  },
  computed: {},
  methods: {
    //返回首页
    gotoPerson() {
      this.$router.push("/person");
    },
    //确认修改个人信息
    confirmChange() {},
    uploadAvatar(formData) {},
    //裁剪
    //上传图片触发
    handleCrop(file) {
      this.$nextTick(() => {
        this.$refs.myCropper.open(file.raw || file);
      });
    },
    // 点击弹框重新时触发
    upAgain() {
      this.$refs["upload"].$refs["upload-inner"].handleClick();
    },
    getFile(file) {
      const formData = new FormData();
      formData.append("avatar_b", file);
      uploadAvatar(formData).then((res) => {
        if (res.code === 0) {
          this.userInfo.avatar_b = res.filename;
          this.userInfo.imageUrl = res.url;
          this.imageUrl = res.url;
          //上传成功后，关闭弹框组件
          // this.handleCrop(file);
          this.$refs.myCropper.close();
        } else {
          this.$message.error("上传出错");
        }
      });
      // this.$refs.upload.submit();
    },
    //头像上传成功之后的方法,进行回调
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.userInfo.avatar_b = res.filename;
        this.userInfo.imageUrl = res.url;
        this.imageUrl = res.url;
        // this.handleCrop(file);
      } else {
        this.$message.error("上传出错");
      }
    },
    //上传图片时会被调用
    changePhotoFile(file) {
      this.handleCrop(file);
    },
    //头像上传之前的方法
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" || "image/jpg" || "image/gif" || "image/png";
      const isLt6M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、JPEG、GIF或PNG 格式!");
      }
      if (!isLt6M) {
        this.$message.error("上传头像图片大小不能超过 6MB!");
      }
      return isJPG && isLt6M;
    },
    //获取用户信息
    getUserInfo() {
      axios({
        url: this.$store.state.yuming+"/user/getByUsername",
        method: "GET",
        params: {
          username: this.$store.state.username,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          //code=='0'表示登录成功，进行本地存储和store存储 并进行跳转。
          //else 弹出错误提示
          if (code == "200") {
            this.userInfo = data;
          } else {
            this.$message({
              message: "获取用户信息失败",
              type: "danger",
            });
            this.$router.push("/");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getUserInfo();
    this.isLoading = false;
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
.tab {
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
  margin: 20px 5%;
}
.vertical {
  display: inline-block;
  width: 1px;
  height: 18em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
.up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.personDetail {
  width: 500px;
  height: 400px;
}
.all {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.bbb {
  background: url("../assets/3.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 20%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>