<template>
  <Base @custom-event="type">
    <template v-slot:content>
      <div style="border-bottom: 1px solid #F0F0F0;margin-bottom: 20px;">
        <el-card v-for="(book, index) in bokeList" :key="index" class="card">
          <el-row>
            <el-col :span="24" style="font-size: 30px;font-weight:bold"><div class="grid-content ep-bg-purple" />
              <router-link :to="`/boke?id=${book.id}`" style="text-decoration:none;font-weight: bold;color: #555;">{{ book.titlename }}</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" style="color: #999"
            ><div class="grid-content ep-bg-purple"
            />{{ book.createtime.slice(0,10) }}</el-col>
            <el-col :span="4"
            ><div class="grid-content ep-bg-purple"
            />
              <div style="display: flex; align-items: center;">

                <el-icon size="20" color="red"><CollectionTag /></el-icon>
                <span style="margin-left: 5px;">
                    <a :href="`/#/searchType?id=${book.type}`" style="text-decoration: none;color: #999">
                     {{ this.getTypeNameById(book.type)}}
                    </a>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content ep-bg-purple" />
              {{ book.introduction }}
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
  data(){
    return{
      bokeList:[],
      searchname: '',
      typeid: '',
      typelist:[],
    }
  },
  components: {
    Base,
  },
  name: "SearchType",
  methods:{
    handleRouteChange(to,from) {
      const search = to.query.id;
      this.typeid=search
      this.typebokelist()
    },
    getTypeNameById(id){
      const category = this.typelist.find(category => category.id === id);
      return category ? category.typename : '';
    },
    // 获取分类信息
    async type(date){
      await this.doSomethingAfterCustomEvent(date);
      // 执行其他方法
    },
    async doSomethingAfterCustomEvent(date) {
      this.typelist=date
      // 在此处执行需要在 custom-event 后执行的操作
      // 使用 await 等待异步操作完成
    },
    typebokelist(){
      axios({
        method:'get',
        url:'/gettypeboke',
        params:{
          id: this.typeid
        }
      }).then((res)=>{
        if(res.code==1000){
          this.bokeList=res.data
        }
      })
    },
  },
  created() {
    this.typeid = this.$route.query.id
    this.typebokelist()
  },
  watch: {
    '$route'(to ,from) {
      this.handleRouteChange(to, from);
    }
  },

}
</script>

<style scoped>

</style>