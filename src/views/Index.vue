<template>
  <div class="index">
    <Base @custom-event="type">
      <template v-slot:content>
    <!--    展示文章列表信息-->
        <div style="border-bottom: 1px solid #F0F0F0;margin-bottom: 20px;">
          <el-card v-for="(book, index) in displayedItems" :key="index"  shadow="hover">
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
<!--          分页功能-->
          <el-pagination
              layout="prev, pager, next"
              :total="totalItems"
              :page-size="itemsPerPage"
              @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </Base>
  </div>
</template>

<script>
import Base from "../components/base.vue"
import axios from "axios";
export default {
  components: {
    Base,
  },
  data(){
    return{
      bokeList:[],
      typeid: '',
      typelist:[],
      itemsPerPage: 10,  // 每页显示的卡片数量
      currentPage: 1,   // 当前页码
      totalItems: 0,   // 总卡片数量
      title:'',
    }
  },
  methods:{
    getbokelist(){
      axios({
        method:'get',
        url:"/getbokelist"
      }).then((res)=>{
        if (res.code==1000){ // 请求OK
          // 赋值
          this.bokeList=res.data
          this.totalItems = this.bokeList.length;
        }
      })
    },
    // 根据分类id查询分类
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
    getTypeNameById(id){
      const category = this.typelist.find(category => category.id === id);
      return category ? category.typename : '';
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.getbokelist()
  },
  mounted(){

  },
  computed: {
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.bokeList.slice(startIndex, endIndex);
    }
  },
};
</script>

<style scoped>
.card{
  box-shadow:var(--el-box-shadow-light);
}

</style>
