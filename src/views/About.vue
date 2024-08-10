<template>
  <Base>
    <template v-slot:content>
      <div>
        <h2>关于</h2>
        <!--    展示关于信息-->
        <el-collapse class="title">
          <el-main class="markdown-body" v-html="this.aboutmd"></el-main>
        </el-collapse>
      </div>
    </template>
  </Base>
</template>

<script>
import Base from "../components/base.vue";
import 'github-markdown-css'
import axios from "axios";

export default {
  name: "About",
  components: {
    Base
  },
  data(){
    return{
      aboutmd:'',
    }
  },
  methods:{
    getabout(){
      axios({
        method:'get',
        url:'/about',
      }).then((res)=>{
        this.aboutmd=res.data
      })
    }
  },
  created() {
    this.getabout()
  }
}
</script>

<style scoped>

</style>
