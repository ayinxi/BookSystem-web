<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoRefund"
        content="填写详细信息"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <el-row>
      <el-col :offset="4" :span="16">
        <el-steps
          :space="300"
          :active="1"
          align-center
          simple
          finish-status="success"
        >
          <el-step title="买家申请仅退款"></el-step>
          <el-step title="卖家处理退款申请"></el-step>
          <el-step title="退款完毕"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row style="margin: 20px 0">
      <el-col :offset="4" :span="16">
        <el-card>
          <el-form ref="refundInfo" :model="refundInfo" label-width="100px">
            <el-form-item label="退款商品：">
              <el-row>
                <el-col :span="3">
                  <img
                    :src="bookList.book_img"
                    style="height: 100px; width: 100px"
                  />
                </el-col>
                <el-col :span="21">
                  <div style="margin-right: 30px" class="book-name">
                    {{ bookList.book_name }}
                  </div>
                  <div class="book-total" style="margin-top: 20px">
                    ￥{{ bookList.book_total }}
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="服务类型："> 仅退款 </el-form-item>
            <el-form-item label="货物状态：">
              <el-radio-group v-model="radio">
                <el-radio :label="1">未收到货</el-radio>
                <el-radio :label="2">已收到货</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="退款原因：">
              <el-select v-model="value" placeholder="请选择" v-if="radio == 1">
                <el-option
                  v-for="item in firstOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select v-model="value" placeholder="请选择" v-if="radio == 2">
                <el-option
                  v-for="item in secondOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款金额：" class="book-total">
              ￥{{ bookList.book_total }}
            </el-form-item>
            <el-form-item label="退款说明：">
              <el-input
                type="textarea"
                v-model="refundInfo.reason"
                maxlength="200"
                show-word-limit
                clearable
                style="width: 500px"
                rows="5"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传图片：">
              <el-upload
                action="#"
                list-type="picture-card"
                :on-success="uploadFileDone"
                :before-upload="checkFile"
                :on-remove="removeFile"
                :file-list="fileList"
                :auto-upload="false"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      bookId: this.$route.params.bookId,
      serviceId: this.$route.params.serviceId,
      firstOptions: [
        {
          value: "选项1",
          label: "不喜欢/不想要",
        },
        {
          value: "选项2",
          label: "空包裹",
        },
        {
          value: "选项3",
          label: "未按约定时间发货",
        },
        {
          value: "选项4",
          label: "快递/物流一直未送到",
        },
        {
          value: "选项5",
          label: "快递/物流无跟踪记录",
        },
        {
          value: "选项6",
          label: "货物破损已拒签",
        },
      ],
      secondOptions: [
        {
          value: "选项1",
          label: "退运费",
        },
        {
          value: "选项2",
          label: "实际商品与描述不符",
        },
        {
          value: "选项3",
          label: "做工粗糙/有瑕疵",
        },
        {
          value: "选项4",
          label: "收到商品时有破损/污渍/变形",
        },
        {
          value: "选项5",
          label: "未按约定时间发货",
        },
        {
          value: "选项6",
          label: "卖家发错货",
        },
      ],
      bookList: {
        orderId: 2,
        merchant_id: 2,
        book_merchant: "新华书店网上商城自营图书",
        create_time: "2021-07-14 18:31:30",
        status: 2,
        book_id: 21,
        book_img: require("../assets/youbenshi.jpg"),
        book_name:
          "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
        book_writer: "冯唐",
        book_publish: "东南大学出版社",
        book_unitPrice: 50,
        book_num: 1,
        book_total: 50,
      },
      refundInfo: {
        goods_status: "",
        reason: "",
        option: "",
        img: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    gotoRefund() {
       this.$router.push("/refund/"+this.bookId)
    },
    //上传退款凭证
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提取文件后缀名
    getSuffix(str) {
      const fileExtension = str.substring(str.lastIndexOf(".") + 1);
      return fileExtension;
    },
    checkFile(file) {
      let type = this.getSuffix(file.name);
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (
        type == "JPG" ||
        type == "JPEG" ||
        type == "PNG" ||
        type == "jpg" ||
        type == "png" ||
        type == "jpge"
      ) {
        if (!isLt6M) {
          this.$message.error("上传图片大小不能超过 6MB!");
        } 
      } else {
        this.$message.error("上传图片只能是 JPG、JPEG或PNG 格式!");
      }
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
.book-name {
  font-size: 13px;
}
.book-total {
  color: rgb(221, 98, 98);
}
.book-detail {
  font-size: 13px;
  color: grey;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 0px;
}
.chooseCard {
  margin: 10px 20px;
  height: 130px;
}
.title {
  font-weight: 600;
  margin-bottom: 10px;
}
.description {
  color: grey;
}
</style>