<template>
  <div class="header">
    <div>
      <img src="../assets/kuku.png" />
    </div>
    <div>
      <el-input placeholder="请输入内容" v-model="input" clearable>
        <el-button slot="append" icon="el-icon-search"> </el-button>
      </el-input>
    </div>
    <div>
      <el-badge :value="12" class="item">
        <el-button size="meduim" icon="el-icon-shopping-cart-2"></el-button>
      </el-badge>
    </div>
	<div>
		<el-button size="meduim" type="text" >个人主页</el-button>
	</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: " ",
    };
  },
  methods: {
    
  },
};
</script>

<style>
.header {
	display: flex;
	justify-content:space-around;
	margin-top:20px;
	max-width:80%;
}
</style>
