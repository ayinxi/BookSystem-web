<template>
  <div>
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../assets/jwbc.png" />
      </div>
      <el-button size="medium" @click.native="goToManage" type="danger" plain
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 2% 18%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
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
    <div style="margin: 3% 18% 0%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-col :span="8" style="text-align: center">
            <p>今日新增退款订单数</p>
            <p style="font-size: 40px">{{ newRefundOrder }}</p>
          </el-col>
          <el-col :span="16" style="text-align: center">
            <p>各订单类型所占比例</p>
            <div>
              <div id="chartPie" class="pie-wrap"></div>
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
                size="mini"
                type="text"
                @click="handleInfo(scope.$index, scope.row)"
                >查看详情</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                size="mini"
                type="text"
                @click="handleConfirm(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已退款' || scope.row.state == '已拒绝退款'
                "
                >同意退款</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                size="mini"
                type="text"
                @click="handleRefuse(scope.$index, scope.row)"
                :disabled="
                  scope.row.state == '已退款' || scope.row.state == '已拒绝退款'
                "
                >拒绝退款</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="margin: 0% 10% 3%">
      <el-button @click="batchConfirm" style="margin-left: 78%" type="danger"
        >批量同意退款</el-button
      >
      <el-button @click="batchRefuse" type="warning">批量拒绝退款</el-button>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      newRefundOrder: 12345,
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
      this.$router.push("/shopManage");
    },
    handleInfo() {
      this.$router.push("/refundInfo");
    },
    handleConfirm(index, row) {
      this.$confirm("是否同意退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.state = "已退款";
          this.$message({
            type: "success",
            message: "退款成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退款",
          });
        });
    },
    handleRefuse(index, row) {
      this.$confirm("是否拒绝退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.state = "已拒绝退款";
          this.$message({
            type: "success",
            message: "拒绝退款成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拒绝退款",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    batchConfirm() {
      this.$confirm("是否批量同意退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let multData = this.multipleSelection;
          let tableData1 = this.tableData;
          let multDataLen = multData.length;
          let tableDataLen = tableData1.length;
          for (let i = 0; i < multDataLen; i++) {
            for (let y = 0; y < tableDataLen; y++) {
              if (
                JSON.stringify(tableData1[y]) == JSON.stringify(multData[i]) &&
                tableData1[y].state == "正在申请退款"
              ) {
                //判断是否相等，相等就更改状态
                this.tableData[y].state = "已退款";
              }
            }
          }
          this.$message({
            type: "success",
            message: "批量同意退款成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃批量同意退款",
          });
        });
    },
    batchRefuse() {
      this.$confirm("是否批量拒绝退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let multData = this.multipleSelection;
          let tableData1 = this.tableData;
          let multDataLen = multData.length;
          let tableDataLen = tableData1.length;
          for (let i = 0; i < multDataLen; i++) {
            for (let y = 0; y < tableDataLen; y++) {
              if (
                JSON.stringify(tableData1[y]) == JSON.stringify(multData[i]) &&
                tableData1[y].state == "正在申请退款"
              ) {
                //判断是否相等，相等就更改状态
                this.tableData[y].state = "已拒绝退款";
              }
            }
          }
          this.$message({
            type: "success",
            message: "批量拒绝退款成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃批量拒绝退款",
          });
        });
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
          data: [
            "未发货",
            "已发货",
            "正在申请退款",
            "已退款",
            "已拒绝退款",
            "已收货",
          ],
          right: 500,
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
            center: ["50%", "50%"],
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
  right: 306px;
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
.pie-wrap {
  width: 100%;
  height: 126px;
}
</style>
