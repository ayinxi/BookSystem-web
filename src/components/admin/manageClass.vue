<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../../assets/jwbc.png" />
        <div class="title">管理平台</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="分类管理"></el-page-header></div>
       <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以添加、修改、删除一、二级书籍分类。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
          <div class="block">
            <el-tree
            v-if="data!=''"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
            </el-tree>
            <el-empty v-if="data==''" :image-size="100">
              <p>没有分类，您可以选择<el-button type="text">添加</el-button>一级分类。</p>
            </el-empty>
          </div>
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
    append(data) {
        newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      rename(node, data){

      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button v-if="layer==1" size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.rename(node, data) }>修改</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      }
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

.box3{
  display: flex;
  justify-content: space-between;
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

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>