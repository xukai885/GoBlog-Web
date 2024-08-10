<template>
  <Base>
    <template v-slot:content>
      <div>
        <h2>Share</h2>
        <el-card v-for="(share, index) in shareInfo" :key="index" shadow="hover">
          <el-row>
            <el-col :span="24" style="font-size: 30px;font-weight:bold">
              <div class="grid-content ep-bg-purple"></div>
              <el-link type="info" :href="share.url">{{ formatDate(share.date) }}     {{ share.title }}</el-link>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </template>
  </Base>
</template>

<script>
import Base from '../components/base.vue'
import axios from "axios";

export default {
  data() {
    return {
      shareInfo: []  // 用于存储分享信息的数据
    }
  },
  components: {
    Base,
  },
  name: "Search",
  methods: {
    GetShareInfo() {
      axios({
        method: 'get',
        url: "/share"
      }).then((res) => {
        if (res.code === 1000) { // 请求成功
          this.shareInfo = res.data.shareinfo; // 正确访问返回的shareinfo数据
        }
      }).catch((error) => {
        console.error("获取分享信息时出错: ", error);
      });
    },
    formatDate(dateString) {
      // 转换ISO时间字符串为本地时间格式
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleString(undefined, options);
    },
    handleRouteChange(to, from) {
      // 如果需要，可以在路由变化时执行逻辑
    },
  },
  created() {
    this.GetShareInfo();  // 正确调用方法
  },
  watch: {
    '$route'(to, from) {
      this.handleRouteChange(to, from);
    }
  },
}
</script>

<style scoped>
/* 添加你的样式 */
</style>
