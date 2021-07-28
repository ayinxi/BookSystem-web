<template>
  <div class="home" v-loading="isloading">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../../assets/jwbc.png" />
        <div class="title">后台管理</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="数据可视化"></el-page-header></div>
       <!--
       <div>
        <el-card class="card-big">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以查看教我编程图书商城的各种数据。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      -->
      <div>
        <el-card style="background-color: #3d678a;width: 900px;margin: 20px;">
          <el-row style="color: white">
            <el-col :span="6" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>新增用户</span></el-row>
            </el-col>
            <el-col :span="6" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>新增商家</span></el-row>
            </el-col>
            <el-col :span="6" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>新增图书</span></el-row>
            </el-col>
            <el-col :span="6" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>新增订单</span></el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div>
        <el-card class="card-big">
          <div>
            <div id="chartDom" style="width: 100%;height: 400px;"></div>
          </div>
        </el-card>
      </div>
      <div style="display:flex;justify-content:center;">
        <el-card class="card-small"><!--style="background-color: rgb(41,49,56)"-->
          <div>
            <div id="chartPie_book" style="width: 100%;height: 400px;"></div>
          </div>
        </el-card>
        <el-card class="card-small">
          <div>
            <div id="chartPie_order" style="width: 100%;height: 400px;"></div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {},
  data() {
    return {
      isloading: false,
      dateList: [],
      classData: [],
      classPie: [],
      tempClass:{
        value: 1000,
        name: "示例",
      },
      orderPie: [],
    };
  },
  mounted() {
    this.drawDomChart();
    this.drawPieChart_book();
    this.drawPieChart_order();
  },
  computed: {},
  methods:{
    //回到管理员主页
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
    //获取当前时间
    getNowDate() {
      var nowDate = new Date();
      var i = 6;
      for(;i>=0;i--) {
        this.dateList.push((nowDate.getMonth()+1) + '/' + (nowDate.getDate()-i));
      }
    },
    //获取不同分类图书数量
    getAll() {
      axios({
        url: this.$store.state.yuming+"/category/getAll",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.classData = data;
             console.log(this.classData);
        this.tempClass.value = this.classData[0].book_num;
        this.tempClass.name = this.classData[0].main_name;
        //console.log(this.tempClass);
          } else if (code == "3") {
            this.classData = "";
          } else {
            this.$message.error("获取分类失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取classPie
    getClassPie() {
      console.log(this.classData);
      this.classData.forEach(mainClass => {
        this.tempClass.value = mainClass.book_num;
        this.tempClass.name = mainClass.main_name;
        //console.log(this.tempClass);
      });
    },
    //近七天新增
    drawDomChart() {
      this.chartDom = echarts.init(
        document.getElementById("chartDom"),
        "macarons"
      );
      this.chartDom.setOption({
        title: {
          text: '近七天新增数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增用户', '新增商家', '新增图书', '新增订单']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateList,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '新增用户',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '新增商家',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '新增图书',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '新增订单',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
        ]
      });
    },
    //各分类图书占比
    drawPieChart_book() {
      this.chartPie_book = echarts.init(
        document.getElementById("chartPie_book"),
        "macarons"
      );
      this.chartPie_book.setOption({
        title: {
          text: '各分类图书数量占比',
          //subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              this.tempClass,
              {value: 735, name: '分类2'},
              {value: 580, name: '分类3'},
              {value: 484, name: '分类4'},
              {value: 300, name: '分类5'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }
        ]
      });
    },
    //各状态订单数量占比
    drawPieChart_order() {
      this.chartPie_order = echarts.init(
        document.getElementById("chartPie_order"),
        "macarons"
      );
      this.chartPie_order.setOption({
        title: {
          text: '各状态未完成订单数量占比',
          //subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '未发货'},
              {value: 735, name: '未收货'},
              {value: 580, name: '未评价'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }
        ]
      });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getNowDate();
    await this.getAll();
    this.isLoading = false;
  },
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.header{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.title{
  font-size: 35px;
  padding: 30px 10px;
}

.card-big {
  width: 900px;
  margin: 0px 20px;
}

.card-small {
  width: 440px;
  margin: 20px 10px;
}

.verticalBar2 {
  width: 4px;
  height: 50px;
  background: #3d678a;
  display: inline-block;
  margin-top: 8px;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}

</style>