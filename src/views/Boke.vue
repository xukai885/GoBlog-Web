<template>
  <div class="index">
    <Base>
      <template v-slot:content>
        <!--    展示文章列表信息-->
        <el-collapse class="title">
          <el-main class="markdown-body" v-html="this.boke.content"></el-main>
        </el-collapse>
      </template>
    </Base>
  </div>
</template>

<script>
import Base from "../components/base.vue"
import axios from "axios";

// 导入需要使用的语言
import 'github-markdown-css'
export default {
  components: {
    Base,
  },
  data(){
    return{
      id:"",
      boke:{
        titlename: '',
        content: '',
        createtime: ''
      },
    }
  },
  methods:{
    getboke(){
      axios({
        method:'get',
        url:'/getboke',
        params:{
          id:this.id
        }
      }).then((res)=>{
        this.boke=res.data
        document.title="徐同学的博客|"+this.boke.titlename
      })
    }
  },
  created() {
    this.id=this.$route.query.id
    this.getboke()

  },
};
</script>
<style scoped>
</style>