<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="100px" rules="rules">
      <el-row :gutter="8">
        <!-- 上传头像 -->
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 6 }"
          :xl="{ span: 6 }"
          style="padding-right: 8px; margin-bottom: 30px"
        >
          <!-- <VueAvatarEditorImproved /> -->
        </el-col>
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 12 }"
          :lg="{ span: 12 }"
          :xl="{ span: 12 }"
          style="margin-bottom: 30px"
        >
          <el-form-item label="分类" prop="ids">
            <CommonSelect
              :tagData="tagData"
              :selectedData="form.ids"
            ></CommonSelect>
          </el-form-item>
        </el-col>
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 12 }"
          :lg="{ span: 6 }"
          :xl="{ span: 6 }"
          style="margin-bottom: 30px"
        >
          <box-card />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import VueAvatarEditorImproved from "./components/VueAvatarEditorImproved";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    VueAvatarEditorImproved,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      tagData:[], // 标签数据
      form:{
        ids:[]
      },
      rules:{
        ids:[{required: true, messages:'请选择', trigger: 'change'}]
      },
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getTagData(){
      // @todo 获取标签数据
      this.tagData = [
		{
			"createTime":"2021-05-13 18:04:35",
			"creatorId":null,
			"id":43,
			"lastupTime":"2021-05-13 18:04:35",
			"tagName":"热让他",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 18:01:59",
			"creatorId":null,
			"id":42,
			"lastupTime":"2021-04-27 09:10:10",
			"tagName":"摄影录像",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 18:01:49",
			"creatorId":null,
			"id":41,
			"lastupTime":"2021-04-27 09:08:19",
			"tagName":"社交",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 18:01:10",
			"creatorId":null,
			"id":40,
			"lastupTime":"2021-04-27 09:08:40",
			"tagName":"购物",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 18:00:55",
			"creatorId":null,
			"id":39,
			"lastupTime":"2021-04-27 09:09:27",
			"tagName":"车票预定",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 18:00:35",
			"creatorId":null,
			"id":38,
			"lastupTime":"2021-04-27 09:09:53",
			"tagName":"美食",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 17:59:57",
			"creatorId":null,
			"id":37,
			"lastupTime":"2021-04-27 09:10:28",
			"tagName":"剪辑神器",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 17:59:38",
			"creatorId":null,
			"id":36,
			"lastupTime":"2021-04-27 09:10:44",
			"tagName":"精选歌曲",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 17:41:45",
			"creatorId":null,
			"id":35,
			"lastupTime":"2021-04-27 09:10:55",
			"tagName":"交易平台",
			"updatorId":null
		},
		{
			"createTime":"2021-04-26 17:09:09",
			"creatorId":null,
			"id":34,
			"lastupTime":"2021-04-27 09:11:16",
			"tagName":"视频",
			"updatorId":null
		},
		{
			"createTime":"2021-03-25 14:07:40",
			"creatorId":null,
			"id":26,
			"lastupTime":"2021-04-16 11:14:42",
			"tagName":"迷宫",
			"updatorId":null
		},
		{
			"createTime":"2021-03-23 10:09:17",
			"creatorId":null,
			"id":25,
			"lastupTime":"2021-04-27 09:11:49",
			"tagName":"出行平台",
			"updatorId":null
		},
		{
			"createTime":"2021-03-23 10:08:07",
			"creatorId":null,
			"id":24,
			"lastupTime":"2021-04-27 09:12:21",
			"tagName":"阅读听书",
			"updatorId":null
		},
		{
			"createTime":"2021-03-23 10:07:49",
			"creatorId":null,
			"id":23,
			"lastupTime":"2021-04-27 09:13:04",
			"tagName":"睡眠助手",
			"updatorId":null
		},
		{
			"createTime":"2021-03-23 10:07:15",
			"creatorId":null,
			"id":22,
			"lastupTime":"2021-04-27 09:13:16",
			"tagName":"账单管理",
			"updatorId":null
		},
		{
			"createTime":"2021-03-23 10:07:01",
			"creatorId":null,
			"id":21,
			"lastupTime":"2021-04-16 11:14:00",
			"tagName":"冷笑话",
			"updatorId":null
		},
		{
			"createTime":"2021-03-18 10:08:56",
			"creatorId":null,
			"id":18,
			"lastupTime":"2021-04-27 09:13:28",
			"tagName":"儿童绘本",
			"updatorId":null
		},
		{
			"createTime":"2021-03-18 10:08:31",
			"creatorId":null,
			"id":17,
			"lastupTime":"2021-04-27 09:13:42",
			"tagName":"教育讲解",
			"updatorId":null
		},
		{
			"createTime":"2021-03-18 10:08:11",
			"creatorId":null,
			"id":16,
			"lastupTime":"2021-04-27 09:14:04",
			"tagName":"热门卡通",
			"updatorId":null
		}
	]
    },
    handleChooseTag(val){
      // 由自组建传值过来，赋值（防止已经选到值，但是rules效验不通过的情况）
      this.form.ids = val
    },
  },
  mounted(){
    this.getTagData()
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
