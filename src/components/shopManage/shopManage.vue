<template>
  <div>
    <div class="header">
      <div class="logo4">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div>
        <el-button
          size="meduim"
          class="pageperson"
          icon="el-icon-s-custom"
          @click="gotoPersonPage"
          >个人主页</el-button
        >
      </div>
    </div>
    <div style="margin: 3% 10%">
      <el-row style="margin: 0% 11.5% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span
              ><span
                style="font-weight: 1000; color: #ff623e; font-size: 30px"
                >{{ shopname }}</span
              >
              <p style="font-weight: 1000">
                您可以在本页面使用如下功能: 图书管理 或 订单管理 或 退款管理 或
                店铺管理
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
      <el-row style="margin: 0% 10% 5%">
        <el-col :span="12" class="el-colStyle">
          <el-card class="el-cardStyle">
            <el-col :span="24" style="text-align: center">
              <p style="margin: 1%">各图书类别数量</p>
              <div>
                <div id="chartBar" class="bar-wrap"></div>
              </div>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="12" class="el-colStyle">
          <el-card class="el-cardStyle">
            <el-col :span="4" style="text-align: center">
              <p style="margin: 1%">今日新增订单数</p>
              <p style="font-size: 40px">{{ newOrder }}</p>
            </el-col>
            <el-col :span="20" style="text-align: center">
              <p style="margin: 1%">各订单类型所占比例</p>
              <div>
                <div id="chartPie" class="pie-wrap"></div>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin: 0% 10% 5%">
        <el-col :span="12" class="el-colStyle">
          <el-card class="el-cardStyle" shadow="hover" @click.native="goToBookM"
            ><p class="iconfont-chuangyexiangmu" style="font-size: 40px"></p>
            <p class="spanStyle">图书管理</p>
          </el-card>
        </el-col>
        <el-col :span="12" class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToOrderM"
            ><p class="iconfont-dingdan" style="font-size: 40px"></p>
            <p class="spanStyle">订单管理</p></el-card
          >
        </el-col>
      </el-row>
      <el-row style="margin: 0% 10% 5%">
        <el-col :span="12" class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToRefundM"
            ><p class="iconfont-shouhou" style="font-size: 40px"></p>
            <p class="spanStyle">退款管理</p></el-card
          >
        </el-col>
        <el-col :span="12" class="el-colStyle">
          <el-card
            class="el-cardStyle"
            shadow="hover"
            @click.native="goToShopInfo"
            ><p class="iconfont-shangpu" style="font-size: 40px"></p>
            <p class="spanStyle">店铺管理</p></el-card
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      newOrder: 123,
      shopname: "这是一家好店",
    };
  },
  mounted() {
    this.drawBarChart();
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    gotoPersonPage() {
      this.$router.push("/person");
    },
    goToBookM() {
      this.$router.push("/bookM");
    },
    goToOrderM() {
      this.$router.push("/orderM");
    },
    goToRefundM() {
      this.$router.push("/refundM");
    },
    goToShopInfo(){
      this.$router.push("/shopInfo");
    },
    drawBarChart() {
      this.chartBar = echarts.init(
        document.getElementById("chartBar"),
        "macarons"
      );
      this.chartBar.setOption({
        color: function (params) {
          var colorList = [
            "#5470c6",
            "#91cc75",
            "#fac858",
            "#ee6666",
            "#73c0de",
          ];
          return colorList[params.dataIndex];
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          height: 180,
        },
        xAxis: [
          {
            type: "category",
            data: ["网络文学", "教育", "小说", "文艺", "青春/动漫"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //---坐标轴 标签
              interval:0,
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 0, //---旋转角度
              margin: 5, //---刻度标签与轴线之间的距离
              color: "#6B6B6B",
              //---默认取轴线的颜色
            },
            axisLine: {
              //---坐标轴 轴线
              show: true, //---是否显示
              lineStyle: {
                color: "#F6F6F6",
                width: 5,
                type: "solid",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              //去掉坐标轴刻线
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#F6F6F6"],
                width: 1,
                type: "solid",
              },
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 0, //---旋转角度
              margin: 5, //---刻度标签与轴线之间的距离
              color: "#6B6B6B", //---默认取轴线的颜色
            },
            axisLine: {
              //---坐标轴 轴线
              show: false, //---是否显示
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: [10, 52, 200, 334, 390],
            animationDuration: 2000,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "#5470c6",
                    "#91cc75",
                    "#fac858",
                    "#ee6666",
                    "#73c0de",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
    drawPieChart() {
      this.chartPie = echarts.init(
        document.getElementById("chartPie"),
        "macarons"
      );
      this.chartPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          right: 0,
          top: "center",
          itemGap: 5, //设置图例的间距
          orient: "vertical",
          data: [
            "未发货",
            "已发货",
            "正在申请退款",
            "已退款",
            "已拒绝退款",
            "已收货",
          ],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "80%"],
            center: ["40%", "50%"],
            data: [
              {
                value: 335,
                name: "未发货",
              },
              {
                value: 310,
                name: "已发货",
              },
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
              {
                value: 532,
                name: "已收货",
              },
            ],
            animationDuration: 2000,
            label: {
              show: false,
              position: "center",
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
.logo4 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 315px;
}
.shopping {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.index {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.el-colStyle {
  display: flex;
  justify-content: center;
}
.el-cardStyle {
  width: 90%;
  display: flex;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
}
.spanStyle {
  font-size: 30px;
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
.bar-wrap {
  width: 100%;
  height: 200px;
}
.el-card__body {
  width: 100%;
}
.pie-wrap {
  width: 100%;
  height: 202.98px;
}
</style>

