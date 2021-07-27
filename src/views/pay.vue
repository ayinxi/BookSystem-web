
<template>
  <div class="search">
    <el-card>
      <el-row>
        <el-col>
          <div>
            <!--此处为页面显示，src为页面路径-->
            <!--style样式高度调用calHeight方法进行设置-->
            <iframe
              :src="this.url"
              frameborder="0"
              width="100%"
              :style="{ height: calHeight }"
              scrolling="auto"
            ></iframe>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "",
      order_id: this.$route.params.orderId,
      total: this.$route.params.total,
    };
  },
  mounted() {
    this.summaryBtn();
  },
  computed: {
    calHeight() {
      return window.innerHeight - 100 + "px";
    },
  },
  methods: {
    summaryBtn() {
      axios({
        url: this.$store.state.yuming + "/alipay",
        method: "GET",
        params: {
          order_id: this.order_id,
          subject: "图书",
          total_amount: this.total,
          body: "",
        },
      }).then((res) => {
        this.url = res;
      });
    },
  },
};
</script>
 
<style scoped>
.search {
  height: 90%;
}
.left-div {
  float: left;
  width: 20%;
  height: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.left-btn {
  background-color: Transparent;
  font-size: 10px;
  border-style: none;
  width: 100%;
  height: 10%;
}
.left-link {
  display: block;
  font-size: 10px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  color: #000000;
  width: 100%;
  height: 10%;
  text-align: center;
  padding: 4px;
  text-decoration: none;
}
.right-div {
  float: right;
  width: 78%;
  height: 550px;
}
</style>
