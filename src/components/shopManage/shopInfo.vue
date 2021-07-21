<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div class="title">店铺管理</div>
    </div>
    <div style="margin: 2% 10%">
      <el-page-header @back="goToManage" content="信息管理"></el-page-header>
    </div>
    <div style="margin: 0% 10%">
      <el-card>
        <el-container>
          <el-aside
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              vertical-align: middle;
            "
          >
            <img class="avatar" :src="this.shopInfo.avatar_b" />
          </el-aside>
          <el-main>
            <p class="pStyle">店铺名称：{{ this.shopInfo.shop_name }}</p>
            <p class="pStyle">店主名称：{{ this.shopInfo.shopper_name }}</p>
            <p class="pStyle1">
              店铺评分：
              <el-rate
                v-model="this.shopInfo.rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
                style="width: 300px"
              >
              </el-rate>
            </p>
            <el-button type="text" @click.native="dialogChangeVisible = true"
              >更改店铺信息</el-button
            >
            <el-button type="text" @click.native="logoutShop"
              >注销店铺</el-button
            >
          </el-main>
        </el-container>
      </el-card>
    </div>
    <el-dialog
      title="更改店铺信息"
      :visible.sync="dialogChangeVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="shopInfo"
        :model="shopInfo"
        label-width="130px"
        :rules="rules"
      >
        <el-form-item label="店铺图片：" prop="avatar_b">
          <span
            ><el-upload
              class="avatar-uploader"
              ref="upload"
              action="http://47.94.131.208:8888"
              :show-file-list="false"
              :on-change="changePhotoFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :name="this.shopInfo.avatar_b"
            >
              <img
                v-if="shopInfo.avatar_b"
                :src="shopInfo.avatar_b"
                class="avatar"
              />
              <img v-else src="../../assets/avatar.jpg" class="avatar" />
              <div class="avatar-uploader-icon">
                <i
                  class="el-icon-warning-outline"
                  style="margin-right: 5px"
                ></i>
                <i style="color: #909399">点击图片进行修改</i>
              </div>
            </el-upload>
            <my-cropper
              ref="myCropper"
              @getFile="getFile"
              @upAgain="upAgain"
            ></my-cropper
          ></span>
        </el-form-item>
        <el-form-item label="店铺名称：" prop="shop_name">
          <el-input v-model="shopInfo.shop_name"> </el-input>
        </el-form-item>
        <el-form-item label="店主名称：" prop="shopper_name">
          <el-input v-model="shopInfo.shopper_name"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo('shopInfo')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MyCropper from "../cropper.vue";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {
    MyCropper,
  },
  data() {
    return {
      dialogChangeVisible: false,
      isLoading: false,
      shopInfo: {
        shop_name: "",
        shopper_name: "",
        avatar_b: "",
        rate: 5,
      },
      formdata: new FormData(),
      rules: {
        shop_name: [
          {
            type: "string",
            required: true,
            message: "请输入店铺名称",
            trigger: "blur",
          },
        ],
        shopper_name: [
          {
            type: "string",
            required: true,
            message: "请输入店主名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    hasUsername() {
      return this.$store.state.username;
    },
  },
  methods: {
    changeInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formdata.append("shop_name", this.shopInfo.shop_name);
          this.formdata.append("shopper_name", this.shopInfo.shopper_name);
          axios({
            url: this.$store.state.yuming + "/shop/updateShop",
            method: "POST",
            data: this.formdata,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "更改信息成功",
                type: "success",
              });
              this.dialogChangeVisible = false;
            } else {
              this.$message.error("更改信息失败，请重试");
            }
          });
        } else {
          return false;
        }
      });
    },
    logoutShop() {
      this.$confirm("是否注销店铺?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios({
          url: this.$store.state.yuming + "/shop/logoutShop",
          method: "DELETE",
          params: {
            username: this.hasUsername,
          },
        })
          .then((res) => {
            const { code } = res.data;
            if (code == "200") {
              this.$message({
                type: "success",
                message: "注销成功",
              });
              this.$router.push("/person")
            } else {
              this.$message.error("注销失败");
            }
          })
          .catch(() => {
            Message({
              type: "error",
              message: "出现错误，请稍后再试",
            });
          });
      });
    },
    goToManage() {
      this.$router.push("/shopManage");
    },
    getShopInfo() {
      axios({
        url: this.$store.state.yuming + "/shop/getPassed",
        method: "GET",
        params: {
          username: this.hasUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.shopInfo = data;
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
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
      this.formdata.append("img", file);
      // 获取上传图片的本地URL，用于上传前的本地预览
      this.shopInfo.avatar_b = window.URL.createObjectURL(file);
      this.$refs.myCropper.close();
    },
    //头像上传成功之后的方法,进行回调
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.lists1.bookImg = res.img;
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
  },
  async created() {
    this.isLoading = true;
    await this.getShopInfo();
    this.isLoading = false;
  },
};
</script>
<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
}
.logo3 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 250px;
}
.imgStyle {
  width: 100%;
  height: 95%;
}
.pStyle {
  text-align: left;
  font-size: 25px;
}
.pStyle1 {
  display: flex;
  justify-content: left;
  align-items: left;
  text-align: left;
  vertical-align: middle;
  font-size: 25px;
}
.el-rate__icon {
  font-size: 25px;
}
.el-rate__text {
  font-size: 25px;
}
.title {
  font-size: 35px;
  padding: 30px 10px;
  position: relative;
  left: 180px;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>