<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../assets/jwbc.png" />
        <div class="title">管理平台</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="分类管理"></el-page-header></div>
       <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以查看、查找、编辑、注销用户信息。。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
          
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      id: 1000,
      data: [{
        id: 1,
        layer: 1,
        label: '一级 1',
        children: [{
          id: 4,
          layer: 2,
          label: '二级 1-1',
        }]
      }, {
        id: 2,
        layer: 1,
        label: '一级 2',
        children: [{
          id: 5,
          layer: 2,
          label: '二级 2-1'
        }, {
          id: 6,
          layer: 2,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        layer: 1,
        label: '一级 3',
        children: [{
          id: 7,
          layer: 2,
          label: '二级 3-1'
        }, {
          id: 8,
          layer: 2,
          label: '二级 3-2'
        }]
      }],
    };
  },
  computed: {},
  methods:{
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
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

.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box2{
  display: flex;
  justify-content: center;
}

.box-card1 {
  width: 900px;
  margin: 20px;
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