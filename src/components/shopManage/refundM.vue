<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div class="title">店铺管理</div>
    </div>
    <div style="margin: 2% 10%">
      <el-page-header @back="goToManage" content="退款管理"></el-page-header>
    </div>
    <div style="margin: 2% 10%">
      <el-row style="margin: 0% 0% 5%">
        <el-card>
          <el-container>
            <el-aside
              style="width: 35px; padding-top: 10px; padding-bottom: 20px"
              ><div class="verticalBar1"></div
            ></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span>
              <p style="font-weight: 1000">
                您可以在本页面进行退款管理，包括: 查看订单详情 同意退款 拒绝退款
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
    </div>
    <div style="margin: 3% 10% 0%">
      <el-row style="margin: 0% 0% 5%">
        <el-card>
          <el-col :span="8">
            <p style="text-align: center">今日新增退款订单数</p>
            <p
              style="
                font-size: 40px;
                height: 160px;
                line-height: 160px;
                display: block;
                text-align: center;
              "
            >
              {{ newRefundOrder }}
            </p>
          </el-col>
          <el-col :span="16" style="text-align: center">
            <p>各订单类型所占比例</p>
            <div>
              <div id="chartPie" class="pie-wrap1"></div>
            </div>
          </el-col>
        </el-card>
      </el-row>
    </div>
    <div style="margin: 1.5% 10%">
      <el-card>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-loading="dataLoading"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="200"
            sortable
            :filters="[
              { text: '2021-07-08', value: '2021-07-08' },
              { text: '2021-07-09', value: '2021-07-09' },
            ]"
            :filter-method="filterDate"
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="用户名" width="200">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column
            label="总价"
            width="200"
            prop="totalprice"
            sortable
            :filters="[
              { text: '0-50元', value: 50 },
              { text: '50-100元', value: 100 },
            ]"
            :filter-method="filterTotalprice"
          >
            <template slot-scope="scope">￥{{ scope.row.totalprice }}</template>
          </el-table-column>
          <el-table-column
            label="订单状态"
            width="200"
            prop="state"
            :filters="[
              { text: '正在申请退款', value: '正在申请退款' },
              { text: '已退款', value: '已退款' },
              { text: '已拒绝退款', value: '已拒绝退款' },
            ]"
            :filter-method="filterState"
          >
            <template slot-scope="scope">{{ scope.row.state }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope"
              ><el-button
                type="text"
                style="font-size: 15px"
                @click="handleInfo(scope.$index, scope.row)"
                >查看详情</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                style="font-size: 15px"
                @click="handleConfirm(scope.row.state, scope.row.order_book_id)"
                :disabled="
                  scope.row.state == '已退款' || scope.row.state == '已拒绝退款'
                "
                >同意</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                style="font-size: 15px"
                @click="handleRefuse(scope.row.state, scope.row.order_book_id)"
                :disabled="
                  scope.row.state == '已退款' || scope.row.state == '已拒绝退款'
                "
                >拒绝</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align: center">
          <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="count"
            layout="prev, pager, next, jumper"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <div style="margin: 0% 10% 3%">
      <el-button @click="batchConfirm" style="margin-left: 92%" type="primary"
        >批量同意</el-button
      >
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: false,
      dataLoading: false,
      newRefundOrder: 12345,
      currentPage:1,
      count:0,
      reason: "",
      multipleSelection: [],
      Order_Book_Ids: [],
      tableData: [
        {
          date: "2021-7-8",
          username: "张三",
          address: "计算机楼001",
          bookname: "书本1号",
          booknum: 5,
          bookprice: 10,
          telephone: 12345678901,
          totalprice: 50,
          state: "正在申请退款",
        },
        {
          date: "2021-7-9",
          username: "李四",
          address: "计算机楼002",
          bookname: "书本2号",
          booknum: 6,
          bookprice: 14,
          telephone: 12345678902,
          totalprice: 84,
          state: "已退款",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    goToManage() {
      this.$router.push("/shopManage#reloaded");
    },
    handleInfo() {
      this.$router.push("/refundInfo");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取数据
    getReback(val) {
      axios({
        url: this.$store.state.yuming + "/order/reback",
        method: "POST",
        params: {
          status: val,
          page_num:this.currentPage,
          order_num:10,
        },
      })
        .then((res) => {
          const { code,data } = res.data;
          if (code == "200") {
            this.tableData=data;
          } else {
            this.$message.error("同意退款失败，请刷新");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    //根据不同的状态来同意退款，换货，还是退货退款
    handleConfirm(state, id) {
      if (state == 1) {
        this.$confirm("是否同意退款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios({
            url: this.$store.state.yuming + "/shop/returnPass",
            method: "POST",
            params: {
              order_book_id: id,
            },
          })
            .then((res) => {
              const { code } = res.data;
              if (code == "200") {
                this.dataLoading = true;
                //获取数据
                this.dataLoading = false;
                this.$message.success("同意退款成功");
              } else {
                this.$message.error("同意退款失败，请刷新");
              }
            })
            .catch(() => {
              this.$message.error("出现错误，请稍后再试");
            });
        });
      } else if (state == 2) {
        this.$confirm("是否同意换货?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios({
            url: this.$store.state.yuming + "/shop/exchangePass",
            method: "POST",
            params: {
              order_book_id: id,
            },
          })
            .then((res) => {
              const { code } = res.data;
              if (code == "200") {
                this.dataLoading = true;
                //获取数据
                this.dataLoading = false;
                this.$message.success("同意换货成功");
              } else {
                this.$message.error("同意换货失败，请刷新");
              }
            })
            .catch(() => {
              this.$message.error("出现错误，请稍后再试");
            });
        });
      } else {
        this.$confirm("是否同意退货退款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          axios({
            url: this.$store.state.yuming + "/shop/returnAllPass",
            method: "POST",
            params: {
              order_book_id: id,
            },
          })
            .then((res) => {
              const { code } = res.data;
              if (code == "200") {
                this.dataLoading = true;
                //获取数据
                this.dataLoading = false;
                this.$message.success("同意退货退款成功");
              } else {
                this.$message.error("同意退货退款失败，请刷新");
              }
            })
            .catch(() => {
              this.$message.error("出现错误，请稍后再试");
            });
        });
      }
    },
    handleRefuse(state, id) {
      if (state == 1) {
        this.$prompt("请输入拒绝退款的理由", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          input: this.reason,
          type: "warning",
        })
          .then(({ value }) => {
            axios({
              url: this.$store.state.yuming + "/shop/returnFail",
              method: "POST",
              params: {
                order_book_id: id,
                check_reason: value,
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("拒绝退款成功");
                  this.reason = "";
                } else {
                  this.$message.error("拒绝退款失败，请刷新");
                  this.reason = "";
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.reason = "";
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃拒绝退款",
            });
          });
      } else if (state == 2) {
        this.$prompt("请输入拒绝换货的理由", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          input: this.reason,
          type: "warning",
        })
          .then(({ value }) => {
            axios({
              url: this.$store.state.yuming + "/shop/exchangeFail",
              method: "POST",
              params: {
                order_book_id: id,
                check_reason: value,
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("拒绝换货成功");
                  this.reason = "";
                } else {
                  this.$message.error("拒绝换货失败，请刷新");
                  this.reason = "";
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.reason = "";
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃拒绝换货",
            });
          });
      } else {
        this.$prompt("请输入拒绝退货退款的理由", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          input: this.reason,
          type: "warning",
        })
          .then(({ value }) => {
            axios({
              url: this.$store.state.yuming + "/shop/returnAllFail",
              method: "POST",
              params: {
                order_book_id: id,
                check_reason: value,
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("拒绝退货退款成功");
                  this.reason = "";
                } else {
                  this.$message.error("拒绝退货退款失败，请刷新");
                  this.reason = "";
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.reason = "";
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃拒绝退货退款",
            });
          });
      }
    },
    //批量同意退款
    batchConfirm() {
      if (this.multipleSelection[0].state == 1) {
        this.$confirm("是否批量同意退款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.Order_Book_Ids.push(this.multipleSelection[i].order_book_id);
            }
            axios({
              url: this.$store.state.yuming + "/shop/batReturnPass",
              method: "POST",
              params: {
                Order_Book_Ids: this.Order_Book_Ids,
              },
              paramsSerializer: (params) => {
                return qs.stringify(params, { indices: false });
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("批量同意退款成功");
                  this.Order_Book_Ids = [];
                } else {
                  this.$message.error("批量同意退款失败，请刷新");
                  this.Order_Book_Ids = [];
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.Order_Book_Ids = [];
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃批量同意退款",
            });
          });
      } else if (this.multipleSelection[0].state == 2) {
        this.$confirm("是否批量同意换货?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.Order_Book_Ids.push(this.multipleSelection[i].order_book_id);
            }
            axios({
              url: this.$store.state.yuming + "/shop/batExchangePass",
              method: "POST",
              params: {
                Order_Book_Ids: this.Order_Book_Ids,
              },
              paramsSerializer: (params) => {
                return qs.stringify(params, { indices: false });
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("批量同意换货成功");
                  this.Order_Book_Ids = [];
                } else {
                  this.$message.error("批量同意换货失败，请刷新");
                  this.Order_Book_Ids = [];
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.Order_Book_Ids = [];
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃批量同意换货",
            });
          });
      } else {
        this.$confirm("是否批量同意退货退款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              this.Order_Book_Ids.push(this.multipleSelection[i].order_book_id);
            }
            axios({
              url: this.$store.state.yuming + "/shop/batReturnAllPass",
              method: "POST",
              params: {
                Order_Book_Ids: this.Order_Book_Ids,
              },
              paramsSerializer: (params) => {
                return qs.stringify(params, { indices: false });
              },
            })
              .then((res) => {
                const { code } = res.data;
                if (code == "200") {
                  this.dataLoading = true;
                  //获取数据
                  this.dataLoading = false;
                  this.$message.success("批量同意退货退款成功");
                  this.Order_Book_Ids = [];
                } else {
                  this.$message.error("批量同意退货退款失败，请刷新");
                  this.Order_Book_Ids = [];
                }
              })
              .catch(() => {
                this.$message.error("出现错误，请稍后再试");
                this.Order_Book_Ids = [];
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已放弃批量同意退货退款",
            });
          });
      }
    },
    filterDate(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterTotalprice(value, row) {
      return row.totalprice <= value && row.totalprice > value - 50;
    },
    filterState(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    drawPieChart() {
      this.chartPie = echarts.init(
        document.getElementById("chartPie"),
        "macarons"
      );
      this.chartPie.setOption({
        //显示在上面的文字
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["正在申请退款", "已退款", "已拒绝退款"],
          right: 250,
          top: "center",
          itemGap: 5, //设置图例的间距
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            //圆圈的粗细
            radius: ["50%", "80%"],
            //圆圈的位置
            center: ["40%", "50%"],
            data: [
              {
                value: 234,
                name: "正在申请退款",
              },
              {
                value: 135,
                name: "已退款",
              },
              {
                value: 548,
                name: "已拒绝退款",
              },
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
            itemStyle: {
              //这里是更添加阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              //这里是更改颜色
              normal: {
                color: function (params) {
                  var colorList = [
                    "#5470c6",
                    "#91cc75",
                    "#fac858",
                    "#ee6666",
                    "#73c0de",
                    "#3ba272",
                    "#fc8452",
                    "#9a60b4",
                    "#ea7ccc",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
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
.verticalBar1 {
  width: 3px;
  height: 100%;
  background: rgb(60, 59, 105);
  display: inline-block;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}
.pie-wrap1 {
  width: 100%;
  height: 200px;
}
.title {
  font-size: 35px;
  padding: 30px 10px;
  position: relative;
  left: 180px;
}
</style>
