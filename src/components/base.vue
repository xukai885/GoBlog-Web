<template>
    <div class="common-layout">
      <!--        头部-->
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="22">
              <el-header style="height: 100px">
                <!--      分割线条-->
                <el-row>
                <el-col :span="1" :offset="21"><el-link :href="`/#/`">首页</el-link></el-col>
                <el-col :span="1"><el-link :href="`/#/share`">分享</el-link></el-col>
                <el-col :span="1"><el-link :href="`/#/about`">关于</el-link></el-col>
              </el-row>
              <div class="site-name ">
                <h1>
                  <a class="logo" href="https://blog.xwnlearn.cn/#/" style="text-decoration:none">
                    徐同学的博客
                  </a>
                </h1>
                <p class="description">宝剑锋从磨砺出，梅花香自苦寒来✌️</p>
              </div>
            </el-header>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
<!--        下部分-->
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="2"></el-col>
<!--              核心区域-->
            <el-col :span="16"><div class="grid-content ep-bg-purple"/>
              <div class="info">
<!--              填充文章-->
                <slot name="content"></slot>
              </div>
            </el-col>
            <el-col :span="1">
            </el-col>

<!--              右侧功能栏-->
<!--            <el-main>-->
            <el-col :span="5">
              <el-row :gutter="5">
  <!--                  搜索框-->
                <div class="custom-row">
                      <el-input v-model="searchName" class="w-50 m-2" placeholder="搜索一下吧" @keyup.enter="handleSearch">
                        <template #prefix>
                          <el-icon class="el-input__icon"><search /></el-icon>
                        </template>
                      </el-input>
                  </div>
                <!--                  分类框-->
                <div class="custom-row">
                  <h3 style="border-bottom:1px solid #ddd;line-height:2.5">分类</h3>
                  <li v-for="category in categories" :key="category.id" style="list-style: none">
                    <el-link :href="`/#/searchType?id=${category.id}`">{{category.typename}} ({{category.count_sum}})</el-link>
                  </li>
                </div>
                <!--                  yiyan框-->
                <div class="custom-row">
                  <div>
                    <h3 style="border-bottom:1px solid #ddd;line-height:2.5">☠️鸡汤</h3>
                    <el-card class="box-card" style="text-indent: 1em;">
                      <div class="text item">{{ yiyan.hitokoto }}   --{{ yiyan.from_source }}</div>
                    </el-card>
                  </div>
                </div>
<!--                时间归档-->
                <div class="custom-row">
                  <div>
                    <h3 style="border-bottom:1px solid #ddd;line-height:2.5">时间归档</h3>
                    <li v-for="category in timeArchive" :key="category.id" style="list-style: none">
                      <el-link :href="`/#/timeArchive/${category.data}`">{{category.data}} ({{category.sum}})</el-link>
                    </li>
                  </div>
                </div>
                <!--                  友情链接-->
                <div class="custom-row">
                  <div>
                    <h3 style="border-bottom:1px solid #ddd;line-height:2.5">友情链接</h3>
                    <li>
                      <a href="https://google.com" target="_blank" class="url_st">Google</a><br>
                    </li>
                    <li>
                      <a href="https://bing.com" target="_blank" class="url_st">Bing</a>
                    </li>

                  </div>
                </div>
                <!--                  联系me框-->
                <div class="custom-row">
                  <div>
                    <h3 style="border-bottom:1px solid #ddd;line-height:2.5">联系方式</h3>
                    <a href="https://t.me/xiaopihaiya" target="_blank">
                      <el-icon :size="50" color="#409EFC"><Promotion /></el-icon>
                    </a>
                  </div>
                </div>
              </el-row>
            </el-col>
<!--            </el-main>-->
          </el-row>
        </el-main>
      </el-container>
      <el-footer style="bottom: 0; left: 0; width: 100%; text-align: center; padding: 10px;">
        ©{{this.year}}|<a href="https://blog.xwnlearn.cn" class="url_st" target="_blank">徐同学的博客</a>|站点已稳定运行{{this.days}}天|<a href="https://beian.miit.gov.cn/" class="url_st" target="_blank">皖ICP备2020020988号-1</a>
      </el-footer>
    </div>

</template>

<script>
import axios from "axios";

export default {

  data(){
    return{
      timeArchive:[],
      categories:[],
      selectedCategory:null,
      searchName:'',
      yiyan:{
        hitokoto:'',
        from_source:''
      },
      year:'',
      days: 0,
    }
  },
  methods:{
    handleSearch(){
      this.$router.push({name: 'search', query: {search: this.searchName}})
    },
    getType(){
      axios({
        method:'get',
        url:'/gettype',
      }).then((res)=>{
        if(res.code==1000){
          this.categories=res.data
          this.$emit('custom-event',this.categories)
        }
      });
      axios({
        method:'get',
        url:'/yiyan'
      }).then((res)=>{
        this.yiyan=res.data
      });
    },
    getTimeArchive(){
      axios({
        method: "get",
        url: "/getTimeArchive",
      }).then((res)=>{
        if(res.code==1000){
          this.timeArchive=res.data
        }
      })
    }
  },
  created() {
    this.getType()
    this.getTimeArchive()
    this.year = new Date().getFullYear();
    this.days = Math.floor((new Date() - new Date("2020-12-22"))/ (1000 * 60 * 60 * 24));
  },
}
</script>
<style>
.url_st {
  text-decoration: none;
  color: inherit;

}
.site-name h1 {
  padding: 0;
  margin: 0;
}

.logo {
  font-size: 37.5px;
  font-weight: bold;
  color: #555;
}
.description {
  margin: 5px 0 0;
  color: #999;
}


.custom-row{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 270px;
}
.text {
  font-size: 14px;
}
.item {
  padding: 5px 0;
}

</style>
